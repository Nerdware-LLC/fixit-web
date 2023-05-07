import jwtDecode from "jwt-decode";
import { storage } from "@utils/storage";
import { ReactiveStore } from "./ReactiveStore";
import { isActiveAccountStore } from "./isActiveAccountStore";
import { isAuthenticatedStore } from "./isAuthenticatedStore";
import { isConnectOnboardingNeededStore } from "./isConnectOnboardingNeededStore";
import type { EncodedAuthToken, AuthTokenPayload } from "@types";

class AuthenticatedUserStore extends ReactiveStore<AuthTokenPayload> {
  /**
   * Process an auth token to authenticate the user.
   */
  processAuthToken(token: EncodedAuthToken): AuthTokenPayload {
    storage.authToken.set(token);

    const tokenPayload: AuthTokenPayload = jwtDecode(token);

    if (!tokenPayload?.stripeConnectAccount?.detailsSubmitted) {
      isConnectOnboardingNeededStore.set(true);
    }

    if (tokenPayload?.subscription) {
      isActiveAccountStore.setIsSubValid(tokenPayload.subscription);
    }

    this.set(tokenPayload);

    isAuthenticatedStore.set(true);

    return tokenPayload;
  }

  /**
   * Remove the auth token and deauthenticate the user.
   */
  deauthenticate() {
    storage.authToken.remove();
    this.reset();
    isAuthenticatedStore.set(false);
    isActiveAccountStore.set(false);
    isConnectOnboardingNeededStore.set(false);
  }
}

export const authenticatedUserStore = new AuthenticatedUserStore();
