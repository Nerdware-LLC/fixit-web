import { useState } from "react";

export const useInboxListVisToggleBtns = ({
  isInboxVisible: initIsInboxVisible = true,
  isSentVisible: initIsSentVisible = true
}: InboxListsVisibilityDict = {}): [InboxListsVisibilityDict, HandleChangeListVisibilityFn] => {
  const [listVisibility, setListVisibility] = useState({
    isInboxVisible: initIsInboxVisible,
    isSentVisible: initIsSentVisible
  });

  const handleChangeListVisibility: HandleChangeListVisibilityFn = (event, newVisibleListNames) => {
    /* To ensure at least 1 list is always visible, if "newVisibleListNames" is empty,
    simply swap list visibility, else run reducer which starts with both list's vis set
    to false and switches them true if in newVisibleListNames.  */
    setListVisibility(
      newVisibleListNames.length !== 0
        ? newVisibleListNames.reduce(
            (accum, listName) => ({ ...accum, [`is${listName}Visible`]: true }),
            {
              isInboxVisible: false,
              isSentVisible: false
            }
          )
        : listVisibility.isInboxVisible === true
        ? { isInboxVisible: false, isSentVisible: true }
        : { isInboxVisible: true, isSentVisible: false }
    );
  };

  return [listVisibility, handleChangeListVisibility];
};

export interface InboxListsVisibilityDict {
  isInboxVisible?: boolean;
  isSentVisible?: boolean;
}

export type HandleChangeListVisibilityFn = (
  event: React.MouseEvent<HTMLElement>,
  newVisibleListNames: Array<"Inbox" | "Sent">
) => void;
