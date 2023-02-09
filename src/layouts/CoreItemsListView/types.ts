import type { WorkOrder, Invoice, Contact } from "@types";

export type ListViewHeader = "Work Orders" | "Invoices" | "Contacts";

export const INBOX_LIST_NAMES = ["Inbox", "Sent"] as const;
export const INBOX_LIST_VIS_KEY = {
  Inbox: "isInboxVisible",
  Sent: "isSentVisible"
} as const;

export type InboxListNames = typeof INBOX_LIST_NAMES[number];

export interface InboxListsVisibilityDict {
  isInboxVisible?: boolean;
  isSentVisible?: boolean;
}

export type HandleChangeListVisibilityFn = (
  event: React.MouseEvent<HTMLElement>,
  newVisibleListNames: Array<typeof INBOX_LIST_NAMES[number]>
) => void;

export interface CoreItemsListConfig {
  listName?: InboxListNames;
  isListVisible?: boolean;
  items: Array<WorkOrder> | Array<Invoice> | Array<Contact>;
}

export type ListViewRenderItemFn = ({
  key,
  item,
  onClick,
  parentListName
}: {
  key: string;
  item: any;
  onClick?: React.MouseEventHandler<HTMLDivElement & HTMLLIElement>;
  parentListName?: InboxListNames;
}) => React.ReactNode;
