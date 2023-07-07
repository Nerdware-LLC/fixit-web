import { getTabA11yProps } from "@components/Tabs/tabA11yProps";
import { LIST_VIEW_LIST_NAMES } from "../types";

/**
 * ListView: Tab a11y Props
 * - Tabs comp: `MobileListHeaderTabs`
 * - Tabpanel comp: `VirtualizedMuiList` (see `CoreItemsListView`)
 */
export const {
  tabProps: listViewTabA11yProps,
  tabPanelProps: listViewTabPanelA11yProps,
  tabsWrapperProps: listViewTabsWrapperA11yProps,
} = getTabA11yProps({
  tabLabels: LIST_VIEW_LIST_NAMES,
  tabsWrapperLabel: "Inbox and Sent list view tabs",
});
