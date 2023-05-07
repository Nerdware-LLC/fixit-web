export type ToggleButtonChangeHandler<T> = (
  event: React.MouseEvent<HTMLElement>,
  newValue: T | null
) => void;

export type ListOrTable = "LIST" | "TABLE";
export type HandleChangeListOrTable = ToggleButtonChangeHandler<ListOrTable>;

export const INBOX_LIST_NAMES = ["Inbox", "Sent"] as const;
export type InboxListName = (typeof INBOX_LIST_NAMES)[number];
export type ListVisibility = Record<InboxListName, boolean>;
export type HandleChangeListVisibility = ToggleButtonChangeHandler<Array<InboxListName>>;

export type ListViewHeaderToggleButtonsProps = {
  listOrTable: ListOrTable;
  handleChangeListOrTable: HandleChangeListOrTable;
  listVisibility?: ListVisibility;
  handleChangeListVisibility?: HandleChangeListVisibility;
  isMobilePageLayout: boolean;
};
