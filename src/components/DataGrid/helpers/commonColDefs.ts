import { getDateAndTimeStr } from "@/utils/formatters/dateTime.js";
import type { GridColDef } from "@mui/x-data-grid";

const GLOBAL_DEFAULTS = {
  type: "string",
  editable: false,
  minWidth: 150,
  maxWidth: 600,
} as const satisfies Partial<GridColDef>;

const CENTERED_COLUMN = {
  headerAlign: "center",
  align: "center",
} as const satisfies Partial<GridColDef>;

/**
 * Common column definitions for DataGrid components.
 */
export const commonColDefs = {
  /** GridColDef global defaults applied to all by `getDataGridColDefs`. */
  defaults: GLOBAL_DEFAULTS,
  /** GridColDef defaults for `type: "date"` applied by `getDataGridColDefs`. */
  dateDefaults: {
    ...GLOBAL_DEFAULTS,
    type: "date",
    minWidth: 100,
    ...CENTERED_COLUMN,
  },
  /** GridColDef defaults for `type: "dateTime"` applied by `getDataGridColDefs`. */
  dateTimeDefaults: {
    ...GLOBAL_DEFAULTS,
    type: "dateTime",
    minWidth: 160,
    valueFormatter: ({ value }) => (value ? getDateAndTimeStr(value) : null),
    ...CENTERED_COLUMN,
  },
  /** GridColDef configs for centering column header and content. */
  centeredColumn: CENTERED_COLUMN,
  /** GridColDef configs for columns with `renderCell`, which need a `valueFormatter` for printing/exporting. */
  renderCellBaseValueFormatter: {
    valueFormatter: ({ value }: { value?: unknown }) => value,
  },
} as const satisfies Record<string, Partial<GridColDef>>;
