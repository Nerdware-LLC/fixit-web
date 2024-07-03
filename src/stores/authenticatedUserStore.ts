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

    const tokenPayload: AuthTokenPayload = jwtDecode(encodedAuthToken);

    if (tokenPayload.stripeConnectAccount.detailsSubmitted === true) {
      isConnectOnboardingCompleteStore.set(true);
    }

    if (tokenPayload.subscription) {
      isActiveAccountStore.setIsSubValid(tokenPayload.subscription);
    }

    this.set(tokenPayload);

    isAuthenticatedStore.set(true);

    return tokenPayload;
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
