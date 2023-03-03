import type { InboxListName } from "../ListViewHeaderToggleButtons";

/**
 * a11y Tab Props
 * - Tabs comp: `MobileListHeaderTabs`
 * - Tabpanel comp: `VirtualizedMuiList` (see `CoreItemsListView`)
 */
export const LIST_TABS_a11y_PROPS: Record<
  InboxListName,
  {
    TAB: Record<"id" | "aria-controls", string>;
    TAB_PANEL: Record<"id" | "aria-labelledby" | "role", string>;
  }
> = {
  Inbox: {
    TAB: {
      id: "Inbox-list-tab",
      "aria-controls": "Inbox-list-tabpanel"
    },
    TAB_PANEL: {
      id: "Inbox-list-tabpanel",
      "aria-labelledby": "Inbox-list-tab",
      role: "tabpanel"
    }
  },
  Sent: {
    TAB: {
      id: "Sent-list-tab",
      "aria-controls": "Sent-list-tabpanel"
    },
    TAB_PANEL: {
      id: "Sent-list-tabpanel",
      "aria-labelledby": "Sent-list-tab",
      role: "tabpanel"
    }
  }
};
