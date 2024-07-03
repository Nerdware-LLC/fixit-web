import { jwtDecode } from "jwt-decode";
import { apolloClient } from "@/app/ApolloProvider/apolloClient.js";
import { googleLogout } from "@/app/GoogleOAuthContext/helpers.js";
import { authTokenLocalStorage } from "./authTokenLocalStorage.js";
import { ReactiveStore } from "./helpers";
import { isActiveAccountStore } from "./isActiveAccountStore.js";
import { isAuthenticatedStore } from "./isAuthenticatedStore.js";
import { isConnectOnboardingCompleteStore } from "./isConnectOnboardingCompleteStore.js";
import type { AuthTokenPayload } from "@/types/open-api.js";

class AuthenticatedUserStore extends ReactiveStore<AuthTokenPayload | null, AuthTokenPayload> {
  /**
   * Process an auth token to authenticate the user.
   */
  processAuthToken(encodedAuthToken: string): AuthTokenPayload {
    authTokenLocalStorage.set(encodedAuthToken);
    authTokenUpdatedAtLocalStorage.set(dayjs().unix());

    const tokenPayload: AuthTokenPayload = jwtDecode(encodedAuthToken);

    if (tokenPayload?.stripeConnectAccount?.detailsSubmitted === true) {
      isConnectOnboardingCompleteStore.set(true);
    }

    if (tokenPayload?.subscription) {
      isActiveAccountStore.setIsSubValid(tokenPayload.subscription);
    }

    this.set(tokenPayload);

    isAuthenticatedStore.set(true);

    return tokenPayload;
  }

  /**
   * Returns a boolean indicating whether an AuthToken refresh should be attempted. This is used
   * in the `useAuthInit` hook to determine if Google OAuth OneTap should be enabled on app load.
   *
   * This fn returns `true` only if all of the following conditions are `true`:
   * - The user has truthy values in LocalStorage under keys "authToken" and "authTokenUpdatedAt".
   * - The timestamp in "authTokenUpdatedAt" is less than 10 hours old.
   *
   * > _`If an "authToken" is present, but it's more than 10h old, it is removed from LocalStorage.`_
   */
  shouldAttemptAuthTokenRefresh(): boolean {
    let shouldAttemptAuthTokenRefresh = false;

    if (authTokenLocalStorage.get()) {
      // Get "authTokenUpdatedAt" unix timestamp from LocalStorage, default to "0" if not present
      const authTokenUpdatedAt = authTokenUpdatedAtLocalStorage.get() ?? 0;
      const tenHoursAgoTimestamp = dayjs().subtract(10, "hours").unix();

      // If the token's updatedAt timestamp is less than 10h old, an attempt can be made to refresh it
      if (authTokenUpdatedAt > tenHoursAgoTimestamp) shouldAttemptAuthTokenRefresh = true;
      else authTokenLocalStorage.remove(); // rm the token if the timestamp is too old
    }

    return shouldAttemptAuthTokenRefresh;
  }

  /**
   * This method de-authenticates the app user by performing the following actions:
   *
   * 1. Stops the Apollo client instance
   * 2. Calls `clearStore` on the Apollo client instance
   * 3. Removes the auth token from local storage
   * 4. Resets the reactive store's value to `null`
   * 5. Resets app state values like `isAuthenticatedStore` to `false`
   */
  deauthenticate() {
    apolloClient.stop();
    void apolloClient.clearStore();
    authTokenLocalStorage.remove();
    googleLogout(); // disables auto-select for Google One Tap
    this.reset();
    isAuthenticatedStore.set(false);
    isActiveAccountStore.set(false);
    isConnectOnboardingCompleteStore.set(false);
  }
}

export const authenticatedUserStore = new AuthenticatedUserStore({ defaultValue: null });
