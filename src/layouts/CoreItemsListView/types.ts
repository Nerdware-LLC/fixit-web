import type { WorkOrder, Invoice, Contact } from "@graphql/types";
import type { InboxListName } from "./ListViewHeaderToggleButtons";

export type ListViewHeader = "Work Orders" | "Invoices" | "Contacts";

export interface CoreItemsListConfig {
  listName?: InboxListName;
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
  listName?: InboxListName;
}) => React.ReactNode;
