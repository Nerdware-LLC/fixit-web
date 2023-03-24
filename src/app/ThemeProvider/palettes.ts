import type { Theme } from "@mui/material/styles";

export const PALETTE_NAMES = ["DARK", "LIGHT"] as const;

/**
 * Mui theme palettes: DARK and LIGHT
 */
export const PALETTES = Object.fromEntries(
  PALETTE_NAMES.map((paletteName) => [
    paletteName,
    {
      // --------------------------------------------------
      mode: paletteName.toLowerCase() as Lowercase<typeof paletteName>,
      // --------------------------------------------------
      primary: {
        light: "#f89a35",
        main: "#f78103", // Fixit brand color
        dark: "#ac5a02"
      },
      // --------------------------------------------------
      secondary:
        paletteName === "DARK"
          ? {
              light: "#a4fff3",
              main: "#00ffdc",
              dark: "#00b3a4"
            }
          : {
              light: "#a19dff",
              main: "#625afa",
              dark: "#443dc2"
            },
      // --------------------------------------------------
      success:
        paletteName === "DARK"
          ? {
              light: "#66ff66",
              main: "#00c851",
              dark: "#008000"
            }
          : {
              light: "#4caf50", // MUI default
              main: "#2e7d32", //  MUI default
              dark: "#1b5e20" //   MUI default
            },
      // --------------------------------------------------
      error:
        paletteName === "DARK"
          ? {
              light: "#e57373", // MUI default
              main: "rgba(255, 115, 115, 0.87)",
              dark: "#d32f2f" // MUI default
            }
          : {
              light: "#e57373", // MUI default
              main: "rgba(255, 115, 115, 0.87)",
              dark: "#c62828" // MUI default
            },
      // --------------------------------------------------
      warning:
        paletteName === "DARK"
          ? {
              light: "#ffd900",
              main: "#b69b00",
              dark: "#a87b00"
            }
          : {
              light: "#ff9800", // MUI default
              main: "#ed6c02", //  MUI default
              dark: "#e65100" //   MUI default
            },
      // --------------------------------------------------
      info:
        paletteName === "DARK"
          ? {
              light: "#4fc3f7", // MUI default
              main: "#29b6f6", // MUI default
              dark: "#0288d1" // MUI default
            }
          : {
              light: "#03a9f4", // MUI default
              main: "#0288d1", //  MUI default
              dark: "#007cbe" //   MUI default
            },
      // --------------------------------------------------
      text:
        paletteName === "DARK"
          ? {
              primary: "#ffffff", //                    MUI default
              secondary: "rgba(175, 175, 175, 0.7)",
              disabled: "rgba(255, 255, 255, 0.5)", //  MUI default
              icon: "rgba(255, 255, 255, 0.5)" //       MUI default
            }
          : {
              primary: "rgba(0, 0, 0, 0.87)", //  MUI default
              secondary: "rgba(0, 0, 0, 0.6)", // MUI default
              disabled: "rgba(0, 0, 0, 0.38)", // MUI default
              icon: "rgba(0, 0, 0, 0.5)" // Custom K-V (Mui doesn't have "icon" color in light mode)
            },
      // --------------------------------------------------
      background:
        paletteName === "DARK"
          ? {
              paper: "#1e1e26",
              default: "#121212"
            }
          : {
              paper: "#e0e0e7",
              default: "#fcfcfc"
            },
      // --------------------------------------------------
      // prettier-ignore
      divider:
        paletteName === "DARK"
          ? "rgba(255, 255, 255, 0.12)" // MUI default
          : "rgba(0, 0, 0, 0.12)" //       MUI default

      // --------------------------------------------------
    }
  ])
) as Record<typeof PALETTE_NAMES[number], Theme["palette"]>;
