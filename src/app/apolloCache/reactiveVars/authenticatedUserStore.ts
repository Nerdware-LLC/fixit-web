import jwtDecode from "jwt-decode";
import { storage } from "@utils/storage";
import { ReactiveStore } from "./ReactiveStore";
import { isActiveAccountStore } from "./isActiveAccountStore";
import { isAuthenticatedStore } from "./isAuthenticatedStore";
import { isConnectOnboardingNeededStore } from "./isConnectOnboardingNeededStore";
import type { AuthTokenPayload } from "@graphql/types";

class AuthenticatedUserStore extends ReactiveStore<AuthTokenPayload> {
  /**
   * An override of `ReactiveStore.mergeUpdate` that shallow-merges all
   * `AuthTokenPayload` properties, including nested objects.
   */
  override mergeUpdate(partialNewValue: Partial<AuthTokenPayload>) {
    const currentValue = this.get();

    const typeSafeCurrentValue =
      currentValue && typeof currentValue === "object"
        ? currentValue
        : ({} as Partial<AuthTokenPayload>);

    return this.set({
      ...typeSafeCurrentValue,
      ...partialNewValue,
      profile: {
        ...(typeSafeCurrentValue?.profile ?? {}),
        ...(partialNewValue?.profile ?? {}),
      },
      subscription: {
        ...(typeSafeCurrentValue?.subscription ?? {}),
        ...(partialNewValue?.subscription ?? {}),
      },
      stripeConnectAccount: {
        ...(typeSafeCurrentValue?.stripeConnectAccount ?? {}),
        ...(partialNewValue?.stripeConnectAccount ?? {}),
      },
    } as AuthTokenPayload);
  }

  /**
   * Process an auth token to authenticate the user.
   */
  processAuthToken(encodedAuthToken: string): AuthTokenPayload {
    storage.authToken.set(encodedAuthToken);

    const tokenPayload: AuthTokenPayload = jwtDecode(encodedAuthToken);

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
