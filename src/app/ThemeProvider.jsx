import React from "react";
import { ThemeProvider as MTP, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { any } from "../types";

export const ThemeProvider = ({ children }) => {
  const theme = createTheme(THEME);

  return (
    <MTP theme={theme}>
      <CssBaseline />
      {children}
    </MTP>
  );
};

const THEME = {
  description: "dark",
  palette: {
    mode: "dark",
    primary: {
      light: "#f89a35",
      main: "#f78103", // Fixit orange
      dark: "#ac5a02"
    },
    secondary: {
      light: "#5381ff",
      main: "#2962ff", // blue
      dark: "#1c44b2"
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
      main: "#ff80ab" // AKA NOTIFICATION
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      disabled: "rgba(255, 255, 255, 0.38)",
      hint: "rgba(255, 255, 255, 0.54)", // AKA PLACEHOLDER
      labels: "#f7a44a" // desaturated Fixit orange (CUSTOM KEY)
    },
    background: {
      paper: "#353535", // AKA SURFACE
      default: "#121212",
      backdrop: "rgba(0, 0, 0, 0.5)" // (CUSTOM KEY)
    }
  }
};

ThemeProvider.propTypes = {
  children: any.isRequired
};
