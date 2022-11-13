import { ReactiveStore } from "./ReactiveStore";
import { storage } from "../../../utils";

export const hasSeenIntroStore = new ReactiveStore<boolean>(
  !!storage.getHasSeenIntro()
) as HasSeenIntroStore;

hasSeenIntroStore.setHasSeenIntro = () => {
  storage.setHasSeenIntro(true);
  hasSeenIntroStore.set(true);
};

type HasSeenIntroStore = {
  setHasSeenIntro: () => void;
} & ReactiveStore<boolean>;
