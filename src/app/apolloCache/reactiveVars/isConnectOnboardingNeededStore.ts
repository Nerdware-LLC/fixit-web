import { ReactiveStore } from "./ReactiveStore";

export const isConnectOnboardingNeededStore =
  new ReactiveStore<boolean>() as IsConnectOnboardingNeededStore;

type IsConnectOnboardingNeededStore = {
  useSubToStore: () => boolean;
  set: (value: boolean) => void;
} & ReactiveStore<boolean>;
