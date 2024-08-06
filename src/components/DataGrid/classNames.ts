import { gridClasses } from "@mui/x-data-grid";

// gridClasses.

/**
 * Class names for `DataGrid` components (src/components/DataGrid/).
 *
 * This object includes {@link gridClasses} exported from MUI's `DataGrid` package.
 */
export const dataGridClassNames = {
  ...gridClasses,
  rowIndexEven: "data-grid-row__index-even",
  rowIndexOdd: "data-grid-row__index-odd",
} as const;
