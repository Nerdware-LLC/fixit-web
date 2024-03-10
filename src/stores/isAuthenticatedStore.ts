import { ReactiveStore } from "./ReactiveStore";

export const isAuthenticatedStore = new ReactiveStore<IsAuthenticated>({
  defaultValue: false,
});

/**
 * A boolean value that represents whether or not the user has been
 * successfully authenticated via the FixitAPI for the purposes of
 * accessing Fixit content/features.
 */
export type IsAuthenticated = boolean;
