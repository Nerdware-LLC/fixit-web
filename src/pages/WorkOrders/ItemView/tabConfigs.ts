import { getTabA11yProps } from "@components/Tabs";

const WO_ITEM_VIEW_TAB_LABELS = ["Work Order", "Description"] as const;

export const WO_ITEM_VIEW_TABS = {
  LABELS: WO_ITEM_VIEW_TAB_LABELS,
  ACTIVE_INDICES: {
    "Work Order": 0,
    Description: 1,
  },
  A11Y_PROPS: getTabA11yProps({
    tabLabels: WO_ITEM_VIEW_TAB_LABELS,
    tabsWrapperLabel: "work order item view tabs",
  }),
};
