import { storage } from "@utils/storage";
import { ReactiveStore } from "./ReactiveStore";
import type { ThemeName } from "@app/ThemeProvider";

class ThemeStore extends ReactiveStore<ThemeName> {
  toggle(currentTheme?: ThemeName) {
    this.set(currentTheme === "DARK" ? "LIGHT" : "DARK");
  }
}

// For added safety, initialize stored value before exporting the store.
storage.preferredTheme.setDefaultIfEmpty("DARK");

export const themeStore = new ThemeStore({ storageKey: "preferredTheme" });
