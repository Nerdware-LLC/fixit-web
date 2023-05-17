import type { WorkOrder, Invoice, Contact } from "@graphql/types";

export const LIST_VIEW_LIST_NAMES = ["Inbox", "Sent"] as const;
export type ListViewListName = (typeof LIST_VIEW_LIST_NAMES)[number];

export type ListViewHeader = "Work Orders" | "Invoices" | "Contacts";

export interface CoreItemsListConfig {
  listName?: ListViewListName;
  items: Array<WorkOrder> | Array<Invoice> | Array<Contact>;
  emptyListFallback: React.ReactNode;
}

export type ListViewRenderItemFn = ({
  item,
  onClick,
  listName,
  ...virtualizedListChildComponentProps
}: {
  item: any;
  onClick?: React.MouseEventHandler<HTMLDivElement & HTMLLIElement>;
  listName?: ListViewListName;
}) => React.ReactNode;
