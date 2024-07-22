import { useState, useEffect, useCallback } from "react";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { useGoogleOneTapLogin } from "@/app/GoogleOAuthContext";
import { useAuthLoginNav } from "@/hooks/useAuthLoginNav.js";
import { authService } from "@/services/authService.js";
import { isAuthenticatedStore } from "@/stores";

/**
 * ### Auth Initialization Hook
 *
 * This hook is used to initialize the User's authentication state when the app is first loaded.
 * The logic implemented here is as follows:
 *
 * 1. CHECK FOR AUTH TOKEN IN LOCAL STORAGE:
 *    - If an AuthToken IS NOT present in LocalStorage, this hook does nothing.
 *    - If an AuthToken IS present, this hook will try two methods to "automatically"
 *      authenticate the User:
 *      1. First, the hook will try to get the User signed in via Google OneTap.
 *      2. If Google OneTap fails, or is dismissed/skipped/disabled, this hook will then attempt
 *         to refresh the User's AuthToken using the `authService.refreshAuthToken` method. Note
 *         that if Google OneTap is dismissed or skipped (not disabled), the refresh request will
 *         be made in the background (i.e. without showing loading/error indicators).
 *
 * 2. UPDATE APP STATE TO REFLECT INITIAL AUTH STATE:
 *    If any method results in successful User authentication, the User is informed via toast msg,
 *    and thereafter redirected to the appropriate page based on their account status:
 *    - If the User has an active subscription, they are redirected to the `/home` page.
 *    - If the User does not have an active subscription, they are redirected to `/products`.
 *
 * 3. FINALLY, `isAuthInitComplete` state is set to `true` to ensure the hook does not run again.
 */
export const useAuthInit = () => {
  const { setIsLoading } = useFetchStateContext();
  const isAuthenticated = isAuthenticatedStore.useSubToStore();
  const [isAuthInitComplete, setIsAuthInitComplete] = useState(false);
  const { handleLoginNav } = useAuthLoginNav({
    authReqFailureErrorMsg:
      "Oops! Automatic sign-in with Google One-Tap didn't work. Please sign in with a different method.",
  });

  /**
   * ### Auth Initialization Handler
   *
   * @param googleIDToken - Google ID Token. If provided, the `authService` method used
   * by this fn will be `loginWithGoogleToken`, otherwise it will be `refreshAuthToken`.
   * @param authFailErrMsg - If provided, a toast will be shown on auth failure.
   */
  const handleAuthInit = useCallback(
    async ({ googleIDToken }: { googleIDToken?: string }) => {
      // Determine the `authService` method to use based on the presence of `googleIDToken`:
      const authInitFn = googleIDToken
        ? () => authService.loginWithGoogleToken({ googleIDToken })
        : authService.refreshAuthToken;

      // Trigger loading and submit the auth request
      setIsLoading(true);
      await authInitFn().catch(() => ({ token: null }));
      setIsLoading(false);

      // Nav+toast based on auth state and account status
      handleLoginNav();
    },
    [handleLoginNav, setIsLoading]
  );

  /**
   * Google OneTap login for automatic sign-in.
   */
  useGoogleOneTapLogin({
    // Only enabled if User is not authenticated when the app first loads
    disabled: isAuthenticated || isAuthInitComplete,
    context: "signin",
    onSuccess: (credentialResponse) => {
      void handleAuthInit({ googleIDToken: credentialResponse.credential });
    },
    onError: () => {
      void handleAuthInit({});
    },
  });

  // EFFECT: Set `isAuthInitComplete` to `true` when the hook completes the auth init process
  useEffect(() => setIsAuthInitComplete(true), []);
};
