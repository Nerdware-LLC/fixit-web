import { ReactiveStore } from "./ReactiveStore";
import type { ThemeName } from "@app/ThemeProvider";

export const themeStore = new ReactiveStore<ThemeName>({
  storageKey: "preferredTheme",
  defaultValue: "DARK"
}) as ThemeStore;

themeStore.toggle = (currentTheme = themeStore.get()) => {
  themeStore.set(currentTheme === "DARK" ? "LIGHT" : "DARK");
};

type ThemeStore = {
  toggle: (currentTheme?: ThemeName) => void;
} & ReactiveStore<ThemeName>;
