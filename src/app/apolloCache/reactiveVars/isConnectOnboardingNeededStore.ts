import { ReactiveStore } from "./ReactiveStore";

export const isConnectOnboardingNeededStore = new ReactiveStore<boolean>({
  defaultValue: false,
});
