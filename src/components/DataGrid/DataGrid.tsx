import { styled, alpha, darken, lighten } from "@mui/material/styles";
import {
  DataGrid as MuiDataGrid,
  GridToolbar,
  type DataGridProps as MuiDataGridProps,
} from "@mui/x-data-grid";
import { avatarClassNames } from "@components/Avatar";
import { dataGridClassNames } from "./classNames";
import { gridPanelSX } from "./styles.gridPanel";
import { dataGridStyledPrintMedia } from "./styles.printMedia";
import type { OverrideProperties } from "type-fest";

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
 *
 * - A "panel" renders as a Mui-Popper when a toolbar button like "COLUMNS" is
 *   clicked/pressed; since it renders in a portal outside of the DataGrid's
 *   position in the DOM tree, styles can't be applied via css selectors within
 *   StyledMuiDataGrid, so its styles/sx are provided inline.
 */
export const DataGrid = ({
  slots = {},
  slotProps = {},
  columnBuffer = 6,
  rowBuffer = 6,
  ...props
}: DataGridProps) => (
  <StyledMuiDataGrid
    slots={{ toolbar: GridToolbar, ...slots }}
    slotProps={{
      ...slotProps,

      toolbar: {
        ...(slotProps?.toolbar ?? {}),
        printOptions: {
          hideFooter: true,
          hideToolbar: true,
          ...(slotProps?.toolbar?.printOptions ?? {}),
        },
        csvOptions: {
          utf8WithBom: true,
          ...(slotProps?.toolbar?.csvOptions ?? {}),
        },
      },

      panel: {
        ...(slotProps?.panel ?? {}),
        sx: {
          ...gridPanelSX,
          ...(slotProps?.panel?.sx ?? {}),
        },
      },
    }}
    columnBuffer={columnBuffer}
    rowBuffer={rowBuffer}
    getRowClassName={({ indexRelativeToCurrentPage: rowIndex }) =>
      rowIndex % 2 === 0 ? dataGridClassNames.rowIndexEven : dataGridClassNames.rowIndexOdd
    }
    {...props}
  />
);

const StyledMuiDataGrid = styled(MuiDataGrid)(({ theme: { palette, variables } }) => {
  const rowHoverStyle = {
    opacity: 0.85,
    backgroundColor:
      palette.mode === "dark"
        ? lighten(palette.background.paper, 0.1)
        : darken(palette.background.paper, 0.1),
  };

  return {
    height: "100%",
    width: "100%",
    backgroundColor: palette.background.paper,
    borderStyle: "solid",
    ...(palette.mode === "light" && {
      borderColor: palette.divider,
    }),

    // @media print
    ...dataGridStyledPrintMedia,

    // TOOLBAR CONTAINER
    [`& .${dataGridClassNames.toolbarContainer}`]: {
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
          padding: "0.25rem",
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
              maxWidth: "1rem",
            },
          }),
        },
        "&:hover": {
          opacity: 0.6,
        },
        "& svg:first-of-type": {
          transform: "translateY(-2px)",
        },
      },
      // For some reason, Mui places a div at the end that's too big, get rid of it
      "& > div:last-of-type": { display: "none" },
    },

    // COLUMN GROUP HEADERS
    [`& .${dataGridClassNames.columnHeadersInner} > div:not(:last-of-type)`]: {
      [`& .${dataGridClassNames.columnHeader}`]: {
        padding: 0,

        [`& div.${dataGridClassNames.columnHeaderTitleContainer}`]: {
          paddingTop: "0.75rem",
          lineHeight: "2rem",
          alignItems: "flex-end",
          justifyContent: "center",
        },
      },
    },

    // ROWS CONTAINER
    [`& .${dataGridClassNames.virtualScroller}`]: {
      backgroundColor: palette.background.default,
      "&:hover": { cursor: "pointer" },

      // ROWS
      [`& .${dataGridClassNames.row}`]: {
        "&:hover": rowHoverStyle,
      },
      // Banded rows by using custom className:
      [`& .${dataGridClassNames.row}.${dataGridClassNames.rowIndexEven}`]: {
        backgroundColor: darken(palette.background.paper, palette.mode === "dark" ? 0.1 : 0.025),
        "&:hover": rowHoverStyle,
      },

      // CELLS
      [`& .${dataGridClassNames.cell}`]: {
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
        [`& > .${dataGridClassNames.cellContent}`]: {
          verticalAlign: "middle",
        },

        // Avatar comps in cells (using our custom className):
        [`& .${avatarClassNames.root}`]: {
          "& .MuiTypography-root": {
            fontSize: "0.875rem",
          },
        },
      },
      [`& .${dataGridClassNames.cell}:not(:last-of-type)`]: {
        borderRightColor:
          palette.mode === "dark"
            ? alpha(palette.grey[300], 0.035)
            : alpha(palette.grey[400], 0.45),
      },
    },

    // NO-ROWS-OVERLAY
    [`& .${dataGridClassNames.overlay}`]: {
      textTransform: "capitalize",
    },

    // FOOTER CONTAINER
    [`& .${dataGridClassNames.footerContainer}`]: {
      "& .MuiTablePagination-root": {
        width: "100%",
        "& > .MuiTablePagination-toolbar": {
          width: "100%",
          "& .MuiTablePagination-select": {
            lineHeight: "2rem",
          },
        },
      },
    },
  };
});

export type DataGridProps = OverrideProperties<
  Omit<React.ComponentProps<typeof StyledMuiDataGrid>, "getRowClassName">,
  { slots?: Omit<NonNullable<MuiDataGridProps["slots"]>, "toolbar"> }
>;
