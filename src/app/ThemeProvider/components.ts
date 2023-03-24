import type { Theme } from "@mui/material/styles";

/**
 * Mui theme component properties
 */
export const COMPONENTS: Partial<Theme["components"]> = {
  ////////////////////////////////////////////////////////////
  // AppBar

  MuiAppBar: {
    styleOverrides: {
      root: {
        zIndex: 998
        /* Default MuiAppBar z-index is 1100; it's lowered here to prevent
        all AppBars from rendering on top of the Sentry.ErrorBoundary dialog
        component which has a z-index of 999.  */
      }
    }
  },

  ////////////////////////////////////////////////////////////
  // Avatar

  MuiAvatar: {
    defaultProps: {
      alt: "Fixit user avatar"
    },
    styleOverrides: {
      root: ({ ownerState, theme: { palette } }) => ({
        height: "2.5rem",
        width: "2.5rem",
        textAlign: "center",
        overflow: "hidden !important", // <-- ensure can't be overridden
        color: palette.text.primary,
        ...(palette.mode === "dark"
          ? {
              backgroundImage: `linear-gradient(135deg, ${palette.background.default} 20%, ${palette.background.paper})`,
              border: `1px solid ${palette.divider}`
            }
          : {
              backgroundImage: `linear-gradient(135deg, ${palette.primary.dark} 5%, ${palette.primary.light})`
            }),

        "&:hover": {
          ...(!!ownerState?.onClick && {
            cursor: "pointer",
            opacity: 0.7
          })
        }
      })
    }
  },

  ////////////////////////////////////////////////////////////
  // Button

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
  },

  ////////////////////////////////////////////////////////////
  // Bottom Nav Bar

  MuiBottomNavigationAction: {
    defaultProps: {
      showLabel: true
    }
  },

  ////////////////////////////////////////////////////////////
  // Chip

  MuiChip: {
    styleOverrides: {
      root: {
        maxWidth: "min-content"
      }
    }
  },

  ////////////////////////////////////////////////////////////
  // Tabs

  MuiTabs: {
    defaultProps: {
      textColor: "inherit",
      indicatorColor: "secondary",
      scrollButtons: false
    }
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none" // overrides "uppercase"
      }
    }
  }
};
