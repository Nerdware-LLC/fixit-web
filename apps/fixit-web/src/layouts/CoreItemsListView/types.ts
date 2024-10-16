/**
 * The `CoreItemsListView` component encompasses 2 viewing "modes":
 *
 * 1. `"TABLE"` - uses `DataGrid` to render items in a table.
 * 2. `"LIST"` - uses `VirtualizedList` to render items in a list.
 *
 * In both modes, items which have a `createdBy` user and an `assignedTo` user
 * are organized into two separate data sets:
 *
 * - In `"TABLE"` mode:
 *     1. `"Sent"` - items created by the current user.
 *     2. `"Received"` - items assigned to the current user.
 *
 *     > These `"TABLE"` mode labels are also used by relevant Dashboard charts.
 *
 * - In `"LIST"` mode:
 *     1. `"Sent"` - items created by the current user.
 *     2. `"Inbox"` - items assigned to the current user.
 */

export const LIST_VIEW_MODES = { LIST: "LIST", TABLE: "TABLE" } as const;
export type ListViewMode = keyof typeof LIST_VIEW_MODES;

export const LIST_VIEW_LIST_NAMES = { INBOX: "Inbox", SENT: "Sent" } as const;
export type ListViewListName = (typeof LIST_VIEW_LIST_NAMES)[keyof typeof LIST_VIEW_LIST_NAMES];

export type ListVisibility = Record<ListViewListName, boolean>;

/** Used by `listViewSettingsStore` */
export type ListViewSettings<HasInboxAndSentLists extends boolean> = {
  viewMode: ListViewMode;
  listVisibility: HasInboxAndSentLists extends true ? ListVisibility : null;
};

/** For TABLES/DataGrids and Dashboard charts, "Inbox" is renamed to "Received". */
export const TABLE_VIEW_DATA_SETS = { RECEIVED: "Received", SENT: "Sent" } as const;
export type TableViewDataSet = (typeof TABLE_VIEW_DATA_SETS)[keyof typeof TABLE_VIEW_DATA_SETS];
export type TableViewDataSetProp = { dataSet: TableViewDataSet };

/** For convenience, `ListViewRenderItemFn` is re-exported for ListView consumers: */
export type { ListViewRenderItemFn } from "./CoreItemsListViewContent";
