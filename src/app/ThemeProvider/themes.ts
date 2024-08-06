import { createTheme, responsiveFontSizes, type Theme } from "@mui/material/styles";
import {
  PAGE_LAYOUT_CONTEXT_DEFAULT_VALUES,
  type PageLayoutContextValues,
} from "@/app/PageLayoutContext";
import { COMPONENTS } from "./components.js";
import { PALETTES, PALETTE_NAMES, type PaletteName } from "./palettes.js";
import { TYPOGRAPHY } from "./typography.js";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";

/* Mui docs regarding the above imported @mui/x- theme type augmentations:
  - @mui/x-data-grid     https://mui.com/x/react-data-grid/getting-started/#typescript
  - @mui/x-date-pickers  https://mui.com/x/react-date-pickers/getting-started/#typescript
*/

/**
 * Fields added to custom {@link Theme} extension: `variables`
 */
export type ThemeCustomAppVariables = PageLayoutContextValues;

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

  // Extend `Theme` prop that's available in `sx` and `styled` components
  interface Theme {
    variables: ThemeCustomAppVariables;
  }
  // Allow configuration using `createTheme`
  interface ThemeOptions {
    variables?: Partial<ThemeCustomAppVariables>;
  }
}

export const THEME_NAMES = {
  DARK: "DARK",
  LIGHT: "LIGHT",
} as const satisfies { [Name in PaletteName]: Name };

/**
 * Each theme, DARK and LIGHT, has a unique palette.
 */
export type ThemeName = keyof typeof THEME_NAMES;

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
          ...PAGE_LAYOUT_CONTEXT_DEFAULT_VALUES,
        },
      })
    ),
  ])
) as Record<ThemeName, Theme>;
