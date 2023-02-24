export type ToggleButtonChangeHandler<T> = (
  event: React.MouseEvent<HTMLElement>,
  newValue: T | null
) => void;

export type ListOrTable = "LIST" | "TABLE";
export type HandleChangeListOrTable = ToggleButtonChangeHandler<ListOrTable>;

export type InboxListNames = "Inbox" | "Sent";
export type ListVisibility = Record<InboxListNames, boolean>;
export type HandleChangeListVisibility = ToggleButtonChangeHandler<Array<InboxListNames>>;
