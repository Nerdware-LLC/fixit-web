import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { apolloClient } from "@/app/ApolloProvider/apolloClient";
import { googleLogout } from "@/app/GoogleOAuthContext/helpers";
import { ReactiveStore } from "./ReactiveStore";
import { LocalStorageValueManager } from "./helpers";
import { isActiveAccountStore } from "./isActiveAccountStore";
import { isAuthenticatedStore } from "./isAuthenticatedStore";
import { isConnectOnboardingCompleteStore } from "./isConnectOnboardingCompleteStore";
import type { AuthTokenPayload } from "@/graphql/types";
import type { Except } from "type-fest";

/**
 * The type of object stored in the {@link authenticatedUserStore}.
 *
 * This type is based on the {@link AuthTokenPayload} type, with the following modifications:
 * - No `__typename` field
 * - All other fields are required/non-optional (missing values default to `null`)
 */
export type AuthenticatedUserObject = Required<Except<AuthTokenPayload, "__typename">>;

/**
 * A `LocalStorageValueManager` instance for the `"authToken"` key.
 * Used by the {@link AuthenticatedUserStore} to manage the auth token.
 */
export const authTokenLocalStorage = new LocalStorageValueManager<string | null>("authToken", null);

/**
 * A `LocalStorageValueManager` instance for the `"authTokenUpdatedAt"` key.
 * Used to determine if the User should be shown the Google OAuth OneTap prompt on app load.
 */
export const authTokenUpdatedAtLocalStorage = new LocalStorageValueManager<number | null>(
  "authTokenUpdatedAt",
  null
);

class AuthenticatedUserStore extends ReactiveStore<
  AuthenticatedUserObject | null,
  AuthenticatedUserObject
> {
  /**
   * Process an auth token to authenticate the user.
   */
  processAuthToken(encodedAuthToken: string): AuthenticatedUserObject {
    authTokenLocalStorage.set(encodedAuthToken);
    authTokenUpdatedAtLocalStorage.set(dayjs().unix());

    const tokenPayload: AuthTokenPayload = jwtDecode(encodedAuthToken);

    if (tokenPayload?.stripeConnectAccount?.detailsSubmitted === true) {
      isConnectOnboardingCompleteStore.set(true);
    }

    if (tokenPayload?.subscription) {
      isActiveAccountStore.setIsSubValid(tokenPayload.subscription);
    }

    // Make auth'd User obj from the tokenPayload
    const authenticatedUserObject = {
      // Fields which may not be present in tokenPayload default to null:
      phone: null,
      subscription: null,
      stripeConnectAccount: null,
      // Explicit values in tokenPayload override the above defaults:
      ...tokenPayload,
    };

    this.set(authenticatedUserObject);

    isAuthenticatedStore.set(true);

    return authenticatedUserObject;
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
