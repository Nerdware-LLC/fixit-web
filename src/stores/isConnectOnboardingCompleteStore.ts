import { ReactiveStore } from "./helpers";

export const isConnectOnboardingCompleteStore = new ReactiveStore<IsConnectOnboardingComplete>({
  defaultValue: false,
});

/**
 * A boolean value that represents whether or not the user has
 * successfully completed the Stripe Connect onboarding process.
 */
export type IsConnectOnboardingComplete = boolean;
