import { styled, alpha, darken, lighten } from "@mui/material/styles";
import { DataGrid as MuiDataGrid, GridToolbar } from "@mui/x-data-grid";
import { THEMES } from "@app/ThemeProvider";
export type { GridEventListener, GridRowParams } from "@mui/x-data-grid"; // for convenience

/**
 * Styled MUI DataGrid with `GridToolbar`
 *
 * - Column and row buffers have been increased from 3 (default) to 6 for a
 *   smoother scrolling experience; smaller buffers increase the likelihood a
 *   user will see a delayed "pop-in" as the virt-list renders when scrolling.
 *
 * - By default, CSV export files will have prefixes indicating UTF-8 BOM
 *   (Byte Order Mark), which can/should allow Excel to automatically detect
 *   the file encoding as UTF-8.
 */
export const DataGrid = ({
  componentsProps = {},
  ...props
}: React.ComponentProps<typeof StyledMuiDataGrid>) => (
  <StyledMuiDataGrid
    components={{ Toolbar: GridToolbar }}
    componentsProps={{
      ...componentsProps,
      toolbar: {
        ...(componentsProps?.toolbar ?? {}),
        printOptions: {
          hideFooter: true,
          hideToolbar: true,
          ...(componentsProps?.toolbar?.printOptions ?? {})
        },
        csvOptions: {
          utf8WithBom: true,
          ...(componentsProps?.toolbar?.csvOptions ?? {})
        }
      }
      // TODO Add custom NoRowsOverlay https://mui.com/x/react-data-grid/components/#no-rows-overlay
    }}
    columnBuffer={6}
    rowBuffer={6}
    getRowClassName={({ indexRelativeToCurrentPage: rowIndex }) =>
      `data-grid-row-index-${rowIndex % 2 === 0 ? "even" : "odd"}`
    }
    {...props}
  />
);

const StyledMuiDataGrid = styled(MuiDataGrid)(({ theme: { palette, variables } }) => {
  const rowHoverStyle = {
    backgroundColor:
      palette.mode === "dark"
        ? lighten(palette.background.paper, 0.1)
        : darken(palette.background.paper, 0.1),
    opacity: 0.85
  };

  return {
    height: "calc(100% - 1rem)",
    backgroundColor: palette.background.paper,
    borderStyle: "solid",
    ...(palette.mode === "light" && {
      borderColor: palette.divider
    }),

    "@media print": DATA_GRID_PRINT_STYLES,

    // TOOLBAR
    "& .MuiDataGrid-toolbarContainer": {
      padding: "0.5rem",
      alignItems: "stretch", // make all btns same height as toolbar
      justifyContent: variables.isMobilePageLayout ? "space-between" : "flex-end",
      gap: "0.5rem",
      borderStyle: "solid",
      borderColor: palette.divider,
      borderWidth: "0 0 1px 0",
      // Toolbar buttons
      "& button": {
        ...(variables.isMobilePageLayout && {
          width: "20%",
          fontSize: "0.65rem",
          fontWeight: "normal",
          padding: "0.25rem"
        }),
        color: palette.secondary.main,
        backgroundColor: palette.background.paper,
        borderWidth: variables.isMobilePageLayout ? 0 : "1px",
        borderStyle: "solid",
        borderColor: palette.secondary.main,
        verticalAlign: "middle",
        "& .MuiButton-startIcon": {
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
          ...(variables.isMobilePageLayout && {
            maxWidth: "1rem",
            margin: "0 3px 0 0",
            paddingTop: "1px",
            "& svg": {
              maxWidth: "1rem"
            }
          })
        },
        "&:hover": {
          opacity: 0.6
        },
        "& svg:first-of-type": {
          transform: "translateY(-2px)"
        }
      },
      // For some reason, Mui places a div at the end that's too big, get rid of it
      "& > div:last-of-type": { display: "none" }
    },

    // COLUMN GROUP HEADERS
    "& .MuiDataGrid-columnHeadersInner > div:not(:last-of-type)": {
      "& .MuiDataGrid-columnHeader": {
        padding: 0,
        "& div.MuiDataGrid-columnHeaderTitleContainer": {
          paddingTop: "0.75rem",
          lineHeight: "2rem",
          alignItems: "flex-end",
          justifyContent: "center"
        }
      }
    },

    // ROWS CONTAINER
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: palette.background.default,
      "&:hover": { cursor: "pointer" },

      // ROWS
      "& .MuiDataGrid-row": {
        "&:hover": rowHoverStyle
      },
      // Banded rows by using custom className:
      "& .MuiDataGrid-row.data-grid-row-index-even": {
        backgroundColor: darken(palette.background.paper, palette.mode === "dark" ? 0.1 : 0.025),
        "&:hover": rowHoverStyle
      },

      // CELLS
      "& .MuiDataGrid-cell": {
        fontSize: "0.875rem",
        lineHeight: "0.875rem",
        padding: "0.75rem 0.625rem 0.5rem 0.625rem",
        verticalAlign: "middle",
        borderWidth: "1px 1px 0 0",
        borderStyle: "solid",
        borderColor:
          palette.mode === "dark"
            ? alpha(palette.grey[300], 0.125)
            : alpha(palette.grey[400], 0.75),
        "& > .MuiDataGrid-cellContent": {
          verticalAlign: "middle"
        }
      },
      "& .MuiDataGrid-cell:not(:last-of-type)": {
        borderRightColor:
          palette.mode === "dark" ? alpha(palette.grey[300], 0.035) : alpha(palette.grey[400], 0.45)
      }
    }
  };
});

/**
 * When the 'print' option is selected in the 'export' menu, all color-related
 * styles are configured to use LIGHT mode palette values.
 *
 * - Usage: `"@media print": DATA_GRID_PRINT_STYLES`
 */
const DATA_GRID_PRINT_STYLES = {
  color: THEMES.LIGHT.palette.text.primary,
  backgroundColor: THEMES.LIGHT.palette.background.paper,
  borderColor: THEMES.LIGHT.palette.divider,
  "& .MuiDataGrid-toolbarContainer": {
    borderColor: THEMES.LIGHT.palette.divider,
    "& button": {
      color: THEMES.LIGHT.palette.secondary.main,
      backgroundColor: THEMES.LIGHT.palette.background.paper,
      borderColor: THEMES.LIGHT.palette.secondary.main
    }
  },
  "& .MuiDataGrid-virtualScroller": {
    backgroundColor: THEMES.LIGHT.palette.background.default,
    "& .MuiDataGrid-row": {
      "&:hover": {
        backgroundColor: darken(THEMES.LIGHT.palette.background.paper, 0.1)
      }
    },
    "& .MuiDataGrid-row.data-grid-row-index-even": {
      backgroundColor: darken(THEMES.LIGHT.palette.background.paper, 0.025),
      "&:hover": {
        backgroundColor: darken(THEMES.LIGHT.palette.background.paper, 0.1)
      }
    },
    "& .MuiDataGrid-cell": {
      borderColor: alpha(THEMES.LIGHT.palette.grey[400], 0.75)
    },
    "& .MuiDataGrid-cell:not(:last-of-type)": {
      borderRightColor: alpha(THEMES.LIGHT.palette.grey[400], 0.45)
    }
  }
};
