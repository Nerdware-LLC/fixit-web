import { dataGridClassNames } from "../classNames";
import type { GridRowClassNameParams } from "@mui/x-data-grid";

/**
 * This function provides a `getRowClassName` function which returns custom class names for
 * `DataGrid` rows which provide the table with "banded rows" (i.e., alternating row colors).
 *
 * The relevant class names are:
 *   - `data-grid-row-index-even`
 *   - `data-grid-row-index-odd`
 *
 * The actual styles for these classes are defined in the `StyledMuiDataGrid` used by the
 * exported `DataGrid` component.
 */
export const getRowClassNameForBandedRows = ({
  indexRelativeToCurrentPage: rowIndex,
}: GridRowClassNameParams) => {
  return rowIndex % 2 === 0 ? dataGridClassNames.rowIndexEven : dataGridClassNames.rowIndexOdd;
};
