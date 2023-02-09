import type { Theme } from "@mui/material/styles";

/**
 * Mui theme component properties
 */
export const COMPONENTS: Partial<Theme["components"]> = {
  MuiButton: {
    defaultProps: {
      variant: "contained"
    },
    styleOverrides: {
      root: {
        // Roboto font not centering vertically, bump down slightly in buttons:
        paddingTop: "0.35rem",
        paddingBottom: "0.15rem"
      }
    }
  }
};
