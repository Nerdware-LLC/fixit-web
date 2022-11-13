import React from "react";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, type PaletteOptions } from "@mui/material/styles";
import { themeStore } from ".";
import { any } from "../types";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = themeStore.useSubToStore();

  return (
    <MuiThemeProvider theme={THEMES[theme]}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

/**
 * `ThemeProvider` merges this theme object with the @mui/material
 * default theme:
 *
 * https://mui.com/material-ui/customization/default-theme/
 */
const THEMES = Object.fromEntries(
  ["DARK", "LIGHT"].map((themeModeName) => [
    themeModeName,
    createTheme({
      palette: {
        mode: themeModeName.toLowerCase() as PaletteOptions["mode"],
        primary: {
          light: "#f89a35",
          main: "#f78103", // Fixit orange
          dark: "#ac5a02"
        },
        secondary: {
          light: themeModeName === "DARK" ? "#00FFDC" : "#625AFA",
          main: themeModeName === "DARK" ? "#00FFDC" : "#625AFA",
          dark: themeModeName === "DARK" ? "#00FFDC" : "#625AFA"
        },
        success: {
          light: "#33d373",
          main: "#00c851",
          dark: "#008c38"
        },
        error: {
          main: "rgba(255, 115, 115, 0.87)"
        },
        info: {
          main: "#5796D6" // AKA NOTIFICATION
        },
        text: {
          primary: themeModeName === "DARK" ? "rgba(255, 255, 255, 0.87)" : "rgba(0, 0, 0, 0.87)",
          secondary: themeModeName === "DARK" ? "#00FFDC" : "#625AFA",
          disabled: "rgba(255, 255, 255, 0.38)",
          hint: "rgba(255, 255, 255, 0.54)", // AKA PLACEHOLDER
          labels: "#f7a44a" // desaturated Fixit orange (CUSTOM KEY)
        } as any, // <-- Custom theme properties are fine.
        background: {
          paper: themeModeName === "DARK" ? "#353535" : "#cccccc", // AKA SURFACE
          default: themeModeName === "DARK" ? "#121212" : "#f6f6f6",
          backdrop: "rgba(0, 0, 0, 0.5)" // (CUSTOM KEY)
        } as any // <-- Custom theme properties are fine.
      },
      typography: {
        fontFamily: '"Roboto", sans-serif'
      }
    })
  ])
);

ThemeProvider.propTypes = {
  children: any.isRequired
};
