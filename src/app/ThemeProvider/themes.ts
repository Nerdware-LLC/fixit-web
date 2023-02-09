import { createTheme, responsiveFontSizes, type Theme } from "@mui/material/styles";
import { PALETTES, PALETTE_NAMES } from "./palettes";
import { COMPONENTS } from "./components";
import { TYPOGRAPHY } from "./typography";
import { PAGE_LAYOUT_CONTEXT_DEFAULT_VALUES } from "@app/PageLayoutContext";

/**
 * Extended Mui theme typings:
 *
 * - Palette addition "text.icon" color in light mode
 * - Theme prop addition "variables" holds custom properties
 */
declare module "@mui/material/styles" {
  // Custom palette additions:
  interface TypeText {
    icon: string;
  }

  // Custom properties:
  type ThemeCustomVariables = typeof PAGE_LAYOUT_CONTEXT_DEFAULT_VALUES;
  // Extend `Theme` prop that's available in `sx` and `styled` components
  interface Theme {
    variables: ThemeCustomVariables;
  }
  // Allow configuration using `createTheme`
  interface ThemeOptions {
    variables?: Partial<ThemeCustomVariables>;
  }
}

/**
 * Each theme, DARK and LIGHT, has a unique palette.
 */
export type ThemeName = typeof PALETTE_NAMES[number];

/**
 * `createTheme` merges theme inputs with the Mui default theme:
 *
 * - https://mui.com/material-ui/customization/default-theme/
 * - https://mui.com/material-ui/customization/dark-mode/
 *
 * Docs regarding `responsiveFontSizes`:
 *
 * - https://mui.com/material-ui/customization/typography/#responsive-font-sizes
 */
export const THEMES = Object.fromEntries(
  PALETTE_NAMES.map((paletteName) => [
    paletteName,
    responsiveFontSizes(
      createTheme({
        palette: PALETTES[paletteName],
        components: COMPONENTS,
        typography: TYPOGRAPHY,
        variables: {
          // Set both to true by default (ThemeProvider subs to PageLayout context)
          ...PAGE_LAYOUT_CONTEXT_DEFAULT_VALUES
        }
      })
    )
  ])
) as Record<ThemeName, Theme>;
