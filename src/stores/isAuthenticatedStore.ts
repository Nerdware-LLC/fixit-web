import { authTokenLocalStorage } from "./authTokenLocalStorage.js";
import { ReactiveStore } from "./helpers";

export const isAuthenticatedStore = new ReactiveStore<IsAuthenticated>({
  defaultValue: !!authTokenLocalStorage.get(),
});

/**
 * A boolean value that represents whether or not the user has been
 * successfully authenticated via the FixitAPI for the purposes of
 * accessing Fixit content/features.
 */
export type IsAuthenticated = boolean;
