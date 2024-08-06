import type { Theme, Palette, PaletteColor, PaletteOptions } from "@mui/material/styles";
import type { ConditionalKeys } from "type-fest";

/**
 * Keys of `theme.palette` which correspond to a `PaletteColor`, e.g. `"primary"`.
 * This type is used by components like `TimelineEventIcon` that take a color prop
 * used to dynamically look up a color in the `theme.palette` object as shown below.
 * ```ts
 * (color: PaletteColorKey) => theme.palette[color].dark
 * ```
 */
export type PaletteColorKey = ConditionalKeys<Palette, PaletteColor>;

const DARK_PALETTE_NAME = "DARK";
const LIGHT_PALETTE_NAME = "LIGHT";

export const PALETTE_NAMES = [DARK_PALETTE_NAME, LIGHT_PALETTE_NAME] as const;

export type PaletteName = (typeof PALETTE_NAMES)[number];

/**
 * Mui theme palettes: DARK and LIGHT
 */
export const PALETTES = Object.fromEntries(
  PALETTE_NAMES.map((paletteName) => [
    paletteName,
    {
      // --------------------------------------------------
      mode: paletteName.toLowerCase() as Lowercase<PaletteName>,
      // --------------------------------------------------
      primary: {
        light: "#f89a35",
        main: "#f78103", // Fixit brand color
        dark: "#ac5a02",
      },
      // --------------------------------------------------
      secondary:
        paletteName === DARK_PALETTE_NAME
          ? {
              light: "#a4fff3",
              main: "#00ffdc",
              dark: "#00b3a4",
            }
          : {
              light: "#a19dff",
              main: "#625afa",
              dark: "#443dc2",
            },
      // --------------------------------------------------
      success:
        paletteName === DARK_PALETTE_NAME
          ? {
              light: "#66ff66",
              main: "#00c851",
              dark: "#008000",
            }
          : {
              light: "#4caf50", // MUI default
              main: "#13aa08", //  MUI default
              dark: "#1b5e20", //   MUI default
            },
      // --------------------------------------------------
      error:
        paletteName === DARK_PALETTE_NAME
          ? {
              light: "#e57373", // MUI default
              main: "rgba(255, 115, 115, 0.87)",
              dark: "#d32f2f", // MUI default
            }
          : {
              light: "#e57373", // MUI default
              main: "rgba(255, 115, 115, 0.87)",
              dark: "#c62828", // MUI default
            },
      // --------------------------------------------------
      warning:
        paletteName === DARK_PALETTE_NAME
          ? {
              light: "#ffd900",
              main: "#c4bb00",
              dark: "#b09f02",
            }
          : {
              light: "#ff9800", // MUI default
              main: "#ed6c02", //  MUI default
              dark: "#e65100", //   MUI default
            },
      // --------------------------------------------------
      info:
        paletteName === DARK_PALETTE_NAME
          ? {
              light: "#4fc3f7", // MUI default
              main: "#29b6f6", // MUI default
              dark: "#0288d1", // MUI default
            }
          : {
              light: "#03a9f4", // MUI default
              main: "#0288d1", //  MUI default
              dark: "#007cbe", //   MUI default
            },
      // --------------------------------------------------
      text:
        paletteName === DARK_PALETTE_NAME
          ? {
              primary: "#ffffff", //                   MUI default
              secondary: "rgba(255, 255, 255, 0.7)",
              disabled: "rgba(255, 255, 255, 0.5)", // MUI default
              icon: "rgba(255, 255, 255, 0.5)", //     MUI default
            }
          : {
              primary: "rgba(0, 0, 0, 0.87)", //  MUI default
              secondary: "rgba(0, 0, 0, 0.6)", // MUI default
              disabled: "rgba(0, 0, 0, 0.45)",
              icon: "rgba(0, 0, 0, 0.5)", // Custom K-V (Mui doesn't have "icon" color in light mode)
            },
      // --------------------------------------------------
      background:
        paletteName === DARK_PALETTE_NAME
          ? {
              paper: "#1e1e26",
              default: "#121212",
            }
          : {
              paper: "#e0e0e7",
              default: "#fcfcfc",
            },
      // --------------------------------------------------
      // prettier-ignore
      divider:
        paletteName === DARK_PALETTE_NAME
          ? "rgba(255, 255, 255, 0.12)" // MUI default
          : "rgba(0, 0, 0, 0.12)", //      MUI default

      // --------------------------------------------------
    } as const satisfies PaletteOptions,
  ])
) as Record<PaletteName, Theme["palette"]>;
