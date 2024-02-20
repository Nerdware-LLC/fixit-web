import { GridPanel } from "@mui/x-data-grid";
import { buttonBaseClasses } from "@mui/material/ButtonBase";
import { formControlLabelClasses } from "@mui/material/FormControlLabel";
import { paperClasses } from "@mui/material/Paper";
import { switchClasses } from "@mui/material/Switch";
import { _makeDataGridCustomSlotModuleExports } from "./helpers";
import { dataGridClassNames } from "../classNames";

export const gridPanelSX = {
  [`& > .${paperClasses.root}`]: {
    borderWidth: "0 1px 1px 1px",
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: "0 0 0.35rem 0.35rem",

    // PANEL HEADER:
    [`& .${dataGridClassNames.panelHeader}`]: {
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: "divider",
      boxShadow: "0 3px 2px 0 rgba(0,0,0,0.3)",
    },

    // PANEL CONTENT:
    [`& .${dataGridClassNames.panelContent}`]: {
      // COLUMNS PANEL:
      [`& .${dataGridClassNames.columnsPanelRow}`]: {
        "&:not(:last-of-type)": {
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "divider",
        },
        [`& > .${formControlLabelClasses.root}`]: {
          marginLeft: "-0.5rem",
          [`& > .${switchClasses.root}`]: {
            marginRight: "0.5rem",
            [`& > .${switchClasses.switchBase}.${switchClasses.checked}`]: {
              color: "secondary.main",
              [`& + .${switchClasses.track}`]: {
                backgroundColor: "secondary.dark",
              },
            },
          },
        },
      },

      // FILTER-FORM PANEL:

      [`& .${dataGridClassNames.filterForm}`]: {
        [`& > .${dataGridClassNames.filterFormColumnInput}`]: {
          marginLeft: "0.25rem",
        },
        [`& > .${dataGridClassNames.filterFormOperatorInput},.${dataGridClassNames.filterFormValueInput}`]:
          {
            marginLeft: "1rem",
          },
      },
    },

    // PANEL FOOTER:
    [`& .${dataGridClassNames.panelFooter}`]: {
      borderTopWidth: "1px",
      borderTopStyle: "solid",
      borderTopColor: "divider",
      boxShadow: "0 -3px 2px 0 rgba(0,0,0,0.3)",
      padding: "0.5rem 0",
      justifyContent: "space-evenly",

      // "SHOW ALL" and "HIDE ALL" buttons in columns-panel footer:
      [`& > .${buttonBaseClasses.root}`]: {
        backgroundColor: "action.selected",
        color: "text.primary",
        fontSize: "0.9rem",
        fontWeight: "normal",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "text.secondary",
        "&:hover": {
          opacity: 0.7,
        },
      },
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
