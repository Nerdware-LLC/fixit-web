import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import {
  IdConfiguration,
  CredentialResponse,
  GoogleCredentialResponse,
  MomentListener,
  GsiButtonConfiguration,
} from "@/types/googleOAuth.js";
import { useGoogleOAuthContext } from "./GoogleOAuthContext.jsx";
import { extractClientID } from "./helpers.js";
import type { Except } from "type-fest";

export type GoogleOAuthButtonProps = {
  onSuccess: (credentialResponse: CredentialResponse) => void;
  onError?: () => void;
  promptMomentNotification?: MomentListener;
  useOneTap?: boolean;
  containerProps?: Except<BoxProps, "children" | "className">;
} & Omit<IdConfiguration, "client_id" | "callback"> &
  Omit<GsiButtonConfiguration, "width">;

export const GoogleOAuthButton = ({
  onSuccess,
  onError,
  useOneTap,
  promptMomentNotification,
  type = "standard",
  size = "large",
  shape = "pill",
  theme: buttonTheme,
  text,
  logo_alignment,
  locale,
  click_listener,
  containerProps = {},
  use_fedcm_for_prompt = true,
  ...props // <-- passed to `google.accounts.id.initialize`
}: GoogleOAuthButtonProps) => {
  const btnContainerRef = useRef<HTMLDivElement>(null);
  const { clientID, hasGoogleOAuthScriptLoadedSuccessfully } = useGoogleOAuthContext();

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const promptMomentNotificationRef = useRef(promptMomentNotification);
  promptMomentNotificationRef.current = promptMomentNotification;

  // Set default button "theme" if not provided
  const { palette, variables } = useTheme();
  if (!buttonTheme) {
    buttonTheme = palette.mode === "dark" ? "outline" : "filled_blue";
  }

  // Determine the `width` based on mobile/desktop:
  const width = variables.isMobilePageLayout
    ? GOOGLE_OAUTH_BTN_DIMENSIONS.WIDTH.MOBILE
    : GOOGLE_OAUTH_BTN_DIMENSIONS.WIDTH.DESKTOP;

  useEffect(() => {
    if (!hasGoogleOAuthScriptLoadedSuccessfully) return;

    // The context provider ensures that the google.accounts.id library is loaded
    const googleAPI = window.google!;

    googleAPI.accounts.id.initialize({
      client_id: clientID,
      callback: (credentialResponse: GoogleCredentialResponse) => {
        if (!credentialResponse.credential) {
          return onErrorRef.current?.();
        }

        const { credential, select_by } = credentialResponse;
        onSuccessRef.current({
          credential,
          clientId: extractClientID(credentialResponse),
          select_by,
        });
      },
      use_fedcm_for_prompt,
      ...props,
    });

    googleAPI.accounts.id.renderButton(btnContainerRef.current!, {
      type,
      theme: buttonTheme,
      size,
      text,
      shape,
      logo_alignment,
      width,
      locale,
      click_listener,
    });

    if (useOneTap) googleAPI.accounts.id.prompt(promptMomentNotificationRef.current);

    return () => {
      if (useOneTap) googleAPI.accounts.id.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    clientID,
    hasGoogleOAuthScriptLoadedSuccessfully,
    useOneTap,
    type,
    buttonTheme,
    size,
    text,
    shape,
    logo_alignment,
    locale,
  ]);

  return (
    <Box
      {...containerProps}
      ref={btnContainerRef}
      style={{
        ...(containerProps.style ?? {}),
        height: GOOGLE_OAUTH_BTN_DIMENSIONS.HEIGHT,
      }}
      className={googleOAuthButtonClassNames.root}
    />
  );
};

/**
 * The width+height of the Google Login button, in pixels (not currently configurable).
 */
export const GOOGLE_OAUTH_BTN_DIMENSIONS = {
  HEIGHT: 40,
  WIDTH: {
    MOBILE: 304,
    DESKTOP: 320,
  },
} as const;

/**
 * Class names used by the `GoogleAuthButton` component.
 */
export const googleOAuthButtonClassNames = {
  root: "google-open-auth-button__root",
} as const;
