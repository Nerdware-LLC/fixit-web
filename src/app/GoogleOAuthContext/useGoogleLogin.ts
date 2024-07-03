import { useCallback, useEffect, useRef } from "react";
import {
  GoogleOAuthTokenClient,
  GoogleOAuthCodeClient,
  TokenClientConfig,
  TokenResponse,
  CodeClientConfig,
  CodeResponse,
  OverridableTokenClientConfig,
  NonOAuthError,
} from "@/types/googleOAuth.js";
import { useGoogleOAuthContext } from "./GoogleOAuthContext.jsx";

interface ImplicitFlowOptions extends Omit<TokenClientConfig, "client_id" | "scope" | "callback"> {
  onSuccess?: (
    tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">
  ) => void;
  onError?: (
    errorResponse: Pick<TokenResponse, "error" | "error_description" | "error_uri">
  ) => void;
  onNonOAuthError?: (nonOAuthError: NonOAuthError) => void;
  scope?: TokenClientConfig["scope"];
  overrideScope?: boolean;
}

interface AuthCodeFlowOptions extends Omit<CodeClientConfig, "client_id" | "scope" | "callback"> {
  onSuccess?: (
    codeResponse: Omit<CodeResponse, "error" | "error_description" | "error_uri">
  ) => void;
  onError?: (
    errorResponse: Pick<CodeResponse, "error" | "error_description" | "error_uri">
  ) => void;
  onNonOAuthError?: (nonOAuthError: NonOAuthError) => void;
  scope?: CodeResponse["scope"];
  overrideScope?: boolean;
}

export type GoogleLoginFlow = "implicit" | "auth-code";

export type UseGoogleLoginOptionsImplicitFlow = {
  flow?: "implicit";
} & ImplicitFlowOptions;

export type UseGoogleLoginOptionsAuthCodeFlow = {
  flow?: "auth-code";
} & AuthCodeFlowOptions;

export type UseGoogleLoginOptions =
  | UseGoogleLoginOptionsImplicitFlow
  | UseGoogleLoginOptionsAuthCodeFlow;

/**
 * Interface defining two overloads for `useGoogleLogin` hook:
 *   1. Hook used for the implicit flow
 *   2. Hook used for the auth code flow
 */
export interface UseGoogleLoginHook {
  (options: UseGoogleLoginOptionsImplicitFlow): (overrideConfig?: OverridableTokenClientConfig) => void; // prettier-ignore
  (options: UseGoogleLoginOptionsAuthCodeFlow): () => void;
}

export const useGoogleLogin: UseGoogleLoginHook = ({
  flow = "implicit",
  scope = "",
  onSuccess,
  onError,
  onNonOAuthError,
  overrideScope,
  state,
  ...sharedClientInitOpts
}: UseGoogleLoginOptions) => {
  const { clientID, hasGoogleOAuthScriptLoadedSuccessfully } = useGoogleOAuthContext();
  const clientRef = useRef<GoogleOAuthTokenClient | GoogleOAuthCodeClient>();

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const onNonOAuthErrorRef = useRef(onNonOAuthError);
  onNonOAuthErrorRef.current = onNonOAuthError;

  useEffect(() => {
    if (!hasGoogleOAuthScriptLoadedSuccessfully) return;

    // The context provider ensures that the google.accounts.id library is loaded
    const googleAPI = window.google!;

    const clientMethod = flow === "implicit" ? "initTokenClient" : "initCodeClient";

    const client = googleAPI.accounts.oauth2[clientMethod]({
      client_id: clientID,
      scope: overrideScope ? scope : `openid profile email ${scope}`,
      callback: (response) => {
        if (response.error) return onErrorRef.current?.(response);
        onSuccessRef.current?.(
          response as Omit<
            CodeResponse & TokenResponse,
            "error" | "error_description" | "error_uri"
          >
        );
      },
      error_callback: (nonOAuthError: NonOAuthError) => {
        onNonOAuthErrorRef.current?.(nonOAuthError);
      },
      state,
      ...sharedClientInitOpts,
    });

    clientRef.current = client;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientID, hasGoogleOAuthScriptLoadedSuccessfully, flow, scope, state]);

  const loginImplicitFlow = useCallback(
    (overrideConfig?: OverridableTokenClientConfig) =>
      (clientRef.current as GoogleOAuthTokenClient).requestAccessToken(overrideConfig),
    []
  );

  const loginAuthCodeFlow = useCallback(
    () => (clientRef.current as GoogleOAuthCodeClient).requestCode(),
    []
  );

  return flow === "implicit" ? loginImplicitFlow : loginAuthCodeFlow;
};
