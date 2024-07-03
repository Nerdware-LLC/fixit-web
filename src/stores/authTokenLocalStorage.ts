import { LocalStorageValueManager } from "./helpers";

/**
 * A `LocalStorageValueManager` instance for the `"authToken"` key.
 * Used by the `AuthenticatedUserStore` to manage the auth token.
 */
export const authTokenLocalStorage = new LocalStorageValueManager<string | null>("authToken", {
  initialValue: null,
  ttl: 36000000, // 10 hours
});
