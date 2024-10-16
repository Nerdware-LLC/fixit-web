import { tabClasses } from "@mui/material/Tab";
import { tabsClasses } from "@mui/material/Tabs";

/**
 * Class names for `Tabs` components (src/components/Tabs/).
 *
 * This object includes {@link tabsClasses} exported from Mui's `@mui/material/Tabs` component
 * under the key `muiTabs`, as well as {@link tabClasses} exported from Mui's `@mui/material/Tab`
 * component under the key `muiTab`.
 */
export const tabsClassNames = {
  muiTabs: { ...tabsClasses },
  muiTab: { ...tabClasses },
  tabPanel: {
    root: "tab-panel__root",
  },
} as const;
