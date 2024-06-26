import { useEffect, useRef } from "react";
import { useFetchStateContext } from "@/app/FetchStateContext/useFetchStateContext.js";
import { useGoogleOAuthContext } from "./GoogleOAuthContext.jsx";
import { extractClientID } from "./helpers.js";
import type {
  CredentialResponse,
  GoogleCredentialResponse,
  IdConfiguration,
  MomentListener,
  Context,
} from "@/types/googleOAuth.js";

interface UseGoogleOneTapLoginOptions {
  onSuccess: (credentialResponse: CredentialResponse) => void;
  onError?: () => void;
  promptMomentNotification?: MomentListener;
  context?: Context;
  hosted_domain?: string;
  prompt_parent_id?: string;
  state_cookie_domain?: string;
  use_fedcm_for_prompt?: IdConfiguration["use_fedcm_for_prompt"];
  cancel_on_tap_outside?: boolean;
  auto_select?: boolean;
  disabled?: boolean;
}

export const useGoogleOneTapLogin = ({
  onSuccess,
  onError,
  promptMomentNotification,
  context,
  hosted_domain,
  prompt_parent_id,
  state_cookie_domain,
  use_fedcm_for_prompt = true,
  cancel_on_tap_outside = false,
  auto_select = true,
  disabled = false,
}: UseGoogleOneTapLoginOptions): void => {
  const { clientID, hasGoogleOAuthScriptLoadedSuccessfully } = useGoogleOAuthContext();

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const promptMomentNotificationRef = useRef(promptMomentNotification);
  promptMomentNotificationRef.current = promptMomentNotification;

  const { setError: setFetchError } = useFetchStateContext();

  useEffect(() => {
    if (!hasGoogleOAuthScriptLoadedSuccessfully) return;

    // The context provider ensures that the google.accounts.id library is loaded
    const googleAPI = window.google!;

    if (disabled) {
      googleAPI.accounts.id.cancel();
      return;
    }

    googleAPI.accounts.id.initialize({
      client_id: clientID,
      callback: (credentialResponse: GoogleCredentialResponse) => {
        if (!credentialResponse?.credential) {
          setFetchError(
            new Error(
              "Oops! We were unable to obtain valid login credentials from Google — please try again."
            )
          );
          return onErrorRef.current?.();
        }

        const { credential, select_by } = credentialResponse;

        onSuccessRef.current({
          credential,
          clientId: extractClientID(credentialResponse),
          select_by,
        });
      },
      context,
      hosted_domain,
      prompt_parent_id,
      state_cookie_domain,
      use_fedcm_for_prompt,
      cancel_on_tap_outside,
      auto_select,
    });

    googleAPI.accounts.id.prompt(promptMomentNotificationRef.current);

    return () => {
      googleAPI.accounts.id.cancel();
    };
  }, [
    clientID,
    hasGoogleOAuthScriptLoadedSuccessfully,
    context,
    hosted_domain,
    prompt_parent_id,
    state_cookie_domain,
    use_fedcm_for_prompt,
    cancel_on_tap_outside,
    auto_select,
    disabled,
    setFetchError,
  ]);
};
