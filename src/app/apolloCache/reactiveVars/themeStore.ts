import { ReactiveStore } from "./ReactiveStore";
import type { ThemeName } from "@app/ThemeProvider";

class ThemeStore extends ReactiveStore<ThemeName> {
  toggle(currentTheme?: ThemeName) {
    this.set(currentTheme === "DARK" ? "LIGHT" : "DARK");
  }
}

export const themeStore = new ThemeStore({
  storageKey: "preferredTheme",
  defaultValue: "DARK",
});
