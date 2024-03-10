import { GridToolbar } from "@mui/x-data-grid";
import { _makeDataGridCustomSlotModuleExports } from "./helpers";
import { getPrintFileName } from "../helpers";
import type {
  GridToolbarProps,
  GridToolbarExportProps,
  GridCsvExportOptions,
  GridPrintExportOptions,
} from "@mui/x-data-grid";

export const toolbarSlot = _makeDataGridCustomSlotModuleExports({
  slotName: "toolbar",
  component: GridToolbar,
  defaultSlotProps: {
    csvOptions: {
      fileName: getPrintFileName("DataGrid"), // an arbitrary default
      utf8WithBom: true,
    } satisfies GridCsvExportOptions,
    printOptions: {
      hideFooter: true,
      hideToolbar: true,
    } satisfies GridPrintExportOptions,
  } as const satisfies GridToolbarProps & GridToolbarExportProps,
  // The above intersection is necessary for proper intellisense
});
