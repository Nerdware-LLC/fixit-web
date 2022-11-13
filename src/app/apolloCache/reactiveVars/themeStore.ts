import { ReactiveStore } from "./ReactiveStore";

export const themeStore = new ReactiveStore<ThemeName>("DARK") as ThemeStore;

themeStore.toggle = (currentTheme) => {
  if (!currentTheme) currentTheme = themeStore.get() as ThemeName;
  themeStore.set(OTHER_THEME[currentTheme]);
};

const OTHER_THEME = {
  LIGHT: "DARK",
  DARK: "LIGHT"
};

type ThemeName = "DARK" | "LIGHT";

type ThemeStore = {
  useSubToStore: () => ThemeName;
  toggle: (currentTheme?: ThemeName) => void;
} & ReactiveStore<ThemeName>;
