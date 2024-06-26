import { GoogleCredentialResponse, TokenResponse } from "@/types/googleOAuth.js";

export const extractClientID = (
  credentialResponse: GoogleCredentialResponse
): string | undefined => {
  return credentialResponse?.clientId ?? credentialResponse?.client_id;
};

/**
 * When using one-tap login, when logging user out, consider [this issue][link]
 * may happen. To prevent it, call this function when logging user out.
 *
 * [link]: https://developers.google.com/identity/gsi/web/guides/automatic-sign-in-sign-out#sign-out
 */
export const googleLogout = () => {
  window?.google?.accounts?.id?.disableAutoSelect();
};

/**
 * Checks if the user granted all the specified scope or scopes
 * @returns True if all the scopes are granted
 */
export const hasGrantedAllScopesGoogle = (
  tokenResponse: TokenResponse,
  firstScope: string,
  ...restScopes: string[]
): boolean => {
  if (!window?.google) return false;

  return (
    window?.google?.accounts?.oauth2?.hasGrantedAllScopes(
      tokenResponse,
      firstScope,
      ...restScopes
    ) || false
  );
};

/**
 * Checks if the user granted any of the specified scope or scopes.
 * @returns True if any of the scopes are granted
 */
export const hasGrantedAnyScopeGoogle = (
  tokenResponse: TokenResponse,
  firstScope: string,
  ...restScopes: string[]
): boolean => {
  if (!window?.google) return false;

  return (
    window?.google?.accounts?.oauth2?.hasGrantedAnyScope(
      tokenResponse,
      firstScope,
      ...restScopes
    ) || false
  );
};
