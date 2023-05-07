import { listClasses as muiListClassNames } from "@mui/material/List";
import { dataGridClassNames } from "@components/DataGrid";

export const coreItemsListViewClassNames = {
  root: "core-items-list-view-root",
  contentContainer: "core-items-list-view-content-container",
  listsDivider: "core-items-list-view-lists-divider",
  listContainer: "core-items-list-view-list-container",
  list: "core-items-list-view-list",
  muiList: { ...muiListClassNames },
  dataGrid: { ...dataGridClassNames },
};

export const coreListItemLayoutClassNames = {
  root: "list-view-item-root",
  leftContentContainer: "list-view-item-left-content-container",
  avatar: "list-view-item-avatar",
  childrenContentContainer: "list-view-item-children-content-container",
  createdAtText: "list-view-item-created-at-text",
  statusText: "list-view-item-status-text",
};
