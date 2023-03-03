import type { WorkOrder, Invoice, Contact } from "@types";
import type { InboxListName } from "./ListViewHeaderToggleButtons";

export type ListViewHeader = "Work Orders" | "Invoices" | "Contacts";

export interface CoreItemsListConfig {
  listName?: InboxListName;
  items: Array<WorkOrder> | Array<Invoice> | Array<Contact>;
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
