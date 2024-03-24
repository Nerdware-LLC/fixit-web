import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { useGoogleOneTapLogin } from "@/app/GoogleOAuthContext";
import { APP_PATHS } from "@/routes/appPaths";
import { authService, type GoogleTokenLoginParams } from "@/services/authService";
import { isAuthenticatedStore, isActiveAccountStore, authenticatedUserStore } from "@/stores";

/**
 * ### Auth Initialization Hook
 *
 * This hook is used to initialize the User's authentication state when the app is first loaded.
 * The logic implemented here is as follows:
 *
 * - If an AuthToken is not present in LocalStorage, this hook does nothing.
 * - If an AuthToken IS present, this hook will try two methods to "automatically"
 *   authenticate the User:
 *
 *   1. First, the hook will try to get the User signed in via Google OneTap.
 *   2. If Google OneTap fails, or is dismissed/skipped/disabled, this hook will then attempt
 *      to refresh the User's AuthToken using the `authService.refreshAuthToken` method. Note
 *      that if Google OneTap is dismissed or skipped (not disabled), the refresh request will
 *      be made in the background (i.e. without showing loading/error indicators).
 *
 * - If any method results in successful User authentication, the User is informed via toast msg,
 *   and thereafter redirected to the appropriate page based on their account status:
 *
 *   - If the User has an active subscription, they are redirected to the `/home` page.
 *   - If the User does not have an active subscription, they are redirected to the `/products` page.
 */
export const useAuthInit = () => {
  const nav = useNavigate();
  const { setIsLoading } = useFetchStateContext();
  const isAuthenticated = isAuthenticatedStore.useSubToStore();

  /**
   * ### Auth Initialization Handler
   *
   * @param googleIDToken - Google ID Token. If provided, the `authService` method used
   * by this fn will be `loginWithGoogleToken`, otherwise it will be `refreshAuthToken`.
   * @param shouldRunInBackground - If true, loading/error indicators are not shown.
   * @param authFailErrMsg - If provided, a toast will be shown on auth failure (ignored
   * if `shouldRunInBackground` is true).
   */
  const handleAuthInit = useCallback(
    async ({
      googleIDToken,
      authFailErrMsg,
    }: Partial<GoogleTokenLoginParams> & {
      authFailErrMsg?: string;
    }) => {
      // Determine the `authService` method to use based on the presence of `googleIDToken`:
      const authInitFn = googleIDToken
        ? () => authService.loginWithGoogleToken({ googleIDToken })
        : authService.refreshAuthToken;

      // Trigger loading and submit the auth request
      setIsLoading(true);
      const { token } = await authInitFn().catch(() => ({ token: null }));
      setIsLoading(false);

      // If a `token` was returned, the request was successful.

      // If the req was successful, do toast+redirect based on account status
      if (token) {
        // If account is active, nav to /home, else nav to /products
        const isActivePaidAccount = isActiveAccountStore.get();
        if (isActivePaidAccount) {
          toast.success("Welcome back!", { toastId: "refreshed-token" });
          nav(APP_PATHS.HOME);
        } else {
          toast.info("Welcome back! Please select a subscription.", { toastId: "select-a-sub" });
          nav(APP_PATHS.PRODUCTS);
        }
      } else {
        // If the req failed and a authFailErrMsg was provided, then toast+redirect
        if (authFailErrMsg) {
          toast.error(authFailErrMsg, { toastId: "auth-init-request-failed" });
          nav(APP_PATHS.LOGIN);
        }
      }
    },
    [nav, setIsLoading]
  );

  /**
   * Google OneTap login for automatic sign-in.
   */
  useGoogleOneTapLogin({
    // Only enabled if User is not currently authenticated, BUT has an AuthToken already registered
    disabled: isAuthenticated || !authenticatedUserStore.shouldAttemptAuthTokenRefresh(),
    context: "signin",
    onSuccess: (credentialResponse) => {
      void handleAuthInit({
        googleIDToken: credentialResponse.credential,
        authFailErrMsg: AUTH_FAIL_ERR_MSGS.GOOGLE_ONETAP_FAILED,
      });
    },
    onError: () => {
      void handleAuthInit({
        authFailErrMsg: AUTH_FAIL_ERR_MSGS.GOOGLE_ONETAP_FAILED,
      });
    },
  });
};

/**
 * Error messages for failed auth requests.
 */
const AUTH_FAIL_ERR_MSGS = {
  GOOGLE_ONETAP_FAILED:
    "Oops! Automatic sign-in with Google One-Tap didn't work. Please sign in with a different method.",
} as const satisfies Record<string, string>;
