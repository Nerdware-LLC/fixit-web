import { GridPanel } from "@mui/x-data-grid";
import { paperClasses } from "@mui/material/Paper";
import { _makeDataGridCustomSlotModuleExports } from "./helpers.js";
import { dataGridClassNames } from "../classNames.js";

export const gridPanelSX = {
  // ROOT: div.MuiPopper-root.MuiDataGrid-panel

  [`& > .${paperClasses.root}`]: {
    borderWidth: "0 1px 1px 1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: "0 0 0.35rem 0.35rem",

    ///////////////////////////////////////////////////////
    // COL MANAGEMENT

    // COL MANAGEMENT — HEADER:
    [`& .${dataGridClassNames.columnsManagementHeader}`]: {
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: "divider",
      boxShadow: "0 3px 2px 0 rgba(0,0,0,0.3)",
    },

    // COL MANAGEMENT — CONTENT:
    [`& .${dataGridClassNames.columnsManagement}`]: {
      paddingTop: "0.5rem",

      [`& > .${dataGridClassNames.columnsManagementRow}`]: {
        width: "95%", // 100% causes x-scroll
        "&:not(:last-of-type)": {
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "divider",
        },
      },
    },

    // COL MANAGEMENT — FOOTER:
    [`& .${dataGridClassNames.columnsManagementFooter}`]: {
      borderTopWidth: "1px",
      borderTopStyle: "solid",
      borderTopColor: "divider",
      boxShadow: "0 -3px 2px 0 rgba(0,0,0,0.3)",
    },

    ///////////////////////////////////////////////////////
    // FILTER-FORM

    [`& .${dataGridClassNames.filterForm}`]: {
      // FILTER-FORM — INPUTS:
      [`& > .${dataGridClassNames.filterFormColumnInput}`]: { marginLeft: "0.25rem" },
      [`& > .${dataGridClassNames.filterFormOperatorInput}`]: { marginLeft: "1rem" },
      [`& > .${dataGridClassNames.filterFormValueInput}`]: { marginLeft: "1rem" },
    },
  },
};

export const panelSlot = _makeDataGridCustomSlotModuleExports({
  slotName: "panel",
  component: GridPanel,
  defaultSlotProps: {
    sx: gridPanelSX,
  },
});
