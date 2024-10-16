import { THEME_NAMES, type ThemeName } from "@/app/ThemeProvider/themes.js";
import { ReactiveStore, LocalStorageValueManager } from "./helpers";

/**
 * A `LocalStorageValueManager` instance for the `preferredTheme` key.
 *
 * Used by the {@link ThemeStore} to manage the user's preferred theme.
 */
export const preferredThemeLocalStorage = new LocalStorageValueManager<ThemeName>(
  "preferredTheme",
  { initialValue: THEME_NAMES.DARK }
);

class ThemeStore extends ReactiveStore<ThemeName> {
  toggle(currentTheme: ThemeName = this.get()) {
    this.set(currentTheme === THEME_NAMES.DARK ? THEME_NAMES.LIGHT : THEME_NAMES.DARK);
  }
}

export const themeStore = new ThemeStore({
  storageValueManager: preferredThemeLocalStorage,
});
