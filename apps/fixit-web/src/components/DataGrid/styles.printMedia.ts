import { alpha, darken } from "@mui/material/styles";
import { THEMES } from "@/app/ThemeProvider";
import { dataGridClassNames } from "./classNames.js";
import type { CSSObject } from "@emotion/react";

/**
 * When the 'print' option is selected in the 'export' menu, all color-related
 * styles are configured to use LIGHT mode palette values.
 */
export const dataGridStyledPrintMedia = {
  "@media print": {
    color: THEMES.LIGHT.palette.text.primary,
    backgroundColor: THEMES.LIGHT.palette.background.paper,
    borderColor: THEMES.LIGHT.palette.divider,

    [`& .${dataGridClassNames.toolbarContainer}`]: {
      borderColor: THEMES.LIGHT.palette.divider,

      "& button": {
        color: THEMES.LIGHT.palette.secondary.main,
        backgroundColor: THEMES.LIGHT.palette.background.paper,
        borderColor: THEMES.LIGHT.palette.secondary.main,
      },
    },

    [`& .${dataGridClassNames.virtualScroller}`]: {
      backgroundColor: THEMES.LIGHT.palette.background.default,

      [`& .${dataGridClassNames.row}`]: {
        "&:hover": {
          backgroundColor: darken(THEMES.LIGHT.palette.background.paper, 0.1),
        },
      },

      [`& .${dataGridClassNames.row}.${dataGridClassNames.rowIndexEven}`]: {
        backgroundColor: darken(THEMES.LIGHT.palette.background.paper, 0.025),
        "&:hover": {
          backgroundColor: darken(THEMES.LIGHT.palette.background.paper, 0.1),
        },
      },

      [`& .${dataGridClassNames.cell}`]: {
        borderColor: alpha(THEMES.LIGHT.palette.grey[400], 0.75),
      },

      [`& .${dataGridClassNames.cell}:not(:last-of-type)`]: {
        borderRightColor: alpha(THEMES.LIGHT.palette.grey[400], 0.45),
      },
    },
  },
} as const satisfies CSSObject;
