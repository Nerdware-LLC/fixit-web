import { useMemo } from "react";
import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext.js";
import { THEMES, THEME_NAMES, type ThemeName } from "./themes.js";
import type { Theme } from "@mui/material/styles";

/**
 * This hook takes an optional theme-name argument, and returns a memoized Mui-theme object
 * (with app variables like `isMobilePageLayout`) for use by the app's Mui ThemeProvider. The
 * hook is unopinionated about the source of the theme-name argument, which allows this hook
 * and the Mui ThemeProvider to be used in a variety of contexts and environments (e.g., env
 * builds, Storybook decorators, etc.).
 *
 * The theme-name arg is intentionally loosely-typed and optional; unless the arg is explicitly
 * set to `"LIGHT"`, the hook will default to the `"DARK"` theme.
 */
export const useAppThemeObject = (maybeThemeName?: string) => {
  const { isMobileUserAgent, isMobilePageLayout } = usePageLayoutContext();

  const themeName: ThemeName =
    maybeThemeName === THEME_NAMES.LIGHT ? maybeThemeName : THEME_NAMES.DARK;

  const theme: Theme = useMemo(
    () => ({
      ...THEMES[themeName],
      variables: {
        isMobileUserAgent,
        isMobilePageLayout,
      },
    }),
    [themeName, isMobileUserAgent, isMobilePageLayout]
  );

  return theme;
};
