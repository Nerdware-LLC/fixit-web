import type { Theme } from "@mui/material/styles";

/**
 * Mui theme component properties
 */
export const COMPONENTS = {
  ////////////////////////////////////////////////////////////
  // AppBar

  MuiAppBar: {
    styleOverrides: {
      root: {
        zIndex: 998,
        /* Default MuiAppBar z-index is 1100; it's lowered here to prevent
        all AppBars from rendering on top of the Sentry.ErrorBoundary dialog
        component which has a z-index of 999.  */
      },
    },
  },

  ////////////////////////////////////////////////////////////
  // Avatar

  MuiAvatar: {
    defaultProps: {
      alt: "Fixit user avatar",
    },
    styleOverrides: {
      root: ({ ownerState, theme: { palette } }) => ({
        height: "2.5rem",
        width: "2.5rem",
        textAlign: "center",
        overflow: "hidden !important",
        color: palette.text.primary,
        ...(palette.mode === "dark"
          ? {
              backgroundImage: `linear-gradient(135deg, ${palette.background.default} 20%, ${palette.background.paper})`,
              border: `1px solid ${palette.divider}`,
            }
          : {
              backgroundImage: `linear-gradient(135deg, ${palette.primary.dark} 5%, ${palette.primary.light})`,
            }),

        "&:hover": {
          ...(!!ownerState?.onClick && {
            cursor: "pointer",
            opacity: 0.7,
          }),
        },
      }),
    },
  },

  ////////////////////////////////////////////////////////////
  // Button

  MuiButton: {
    defaultProps: {
      variant: "contained",
    },
  },

  ////////////////////////////////////////////////////////////
  // Bottom Nav Bar

  MuiBottomNavigationAction: {
    defaultProps: {
      showLabel: true,
    },
  },

  ////////////////////////////////////////////////////////////
  // Chip

  MuiChip: {
    styleOverrides: {
      root: {
        maxWidth: "min-content",
      },
    },
  },

  ////////////////////////////////////////////////////////////
  // Modal

  MuiModal: {
    styleOverrides: {
      backdrop: {
        backdropFilter: "blur(1.5px)",
      },
    },
  },

  ////////////////////////////////////////////////////////////
  // Stack

  MuiStack: {
    defaultProps: {
      useFlexGap: true,
    },
  },

  ////////////////////////////////////////////////////////////
  // Tabs

  MuiTabs: {
    defaultProps: {
      textColor: "inherit",
      indicatorColor: "secondary",
      scrollButtons: false,
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none", // overrides "uppercase"
      },
    },
  },

  ////////////////////////////////////////////////////////////
  // Tooltip

  MuiTooltip: {
    defaultProps: {
      arrow: true,
    },
    styleOverrides: {
      tooltip: {
        fontSize: "0.75rem", //  default is 11px (0.6875 rem)
      },
    },
  },

  ////////////////////////////////////////////////////////////
} as const satisfies NonNullable<Theme["components"]>;
