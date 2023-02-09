import { useState } from "react";
import { usePageLayoutContext } from "@app";
import type { InboxListsVisibilityDict, HandleChangeListVisibilityFn } from "./types";

/**
 * Initial visibility values:
 *
 * - if NOT MOBILE:
 *     - allow both lists to be visible
 *     - respect any explicit prop values
 *     - both default to true
 * - if MOBILE:
 *     - only 1 list can be visible at a time
 *     - unless isSentVisible is explicitly true, start with inbox
 *     - visibility changes reflect toggle behavior
 */
export const useInboxListVisToggleBtns = ({
  isInboxVisible: initIsInboxVisible,
  isSentVisible: initIsSentVisible
}: InboxListsVisibilityDict = {}): [InboxListsVisibilityDict, HandleChangeListVisibilityFn] => {
  const { isMobilePageLayout } = usePageLayoutContext();

  const [listVisibility, setListVisibility] = useState(
    !isMobilePageLayout
      ? {
          isInboxVisible: initIsInboxVisible ?? true,
          isSentVisible: initIsSentVisible ?? true
        }
      : {
          isInboxVisible: initIsSentVisible !== true,
          isSentVisible: initIsSentVisible === true
        }
  );

  const handleChangeListVisibility: HandleChangeListVisibilityFn = (event, newVisibleListNames) => {
    /* To ensure at least 1 list is always visible, if "newVisibleListNames" is empty or
    isMobilePageLayout is true, simply swap list visibility, else run reducer which starts
    with both list's vis set to false and switches them true if in newVisibleListNames. */
    setListVisibility(
      newVisibleListNames.length !== 0 && !isMobilePageLayout
        ? newVisibleListNames.reduce(
            (accum, listName) => ({ ...accum, [`is${listName}Visible`]: true }),
            {
              isInboxVisible: false,
              isSentVisible: false
            }
          )
        : {
            isInboxVisible: !listVisibility.isInboxVisible,
            isSentVisible: listVisibility.isInboxVisible
          }
    );
  };

  return [listVisibility, handleChangeListVisibility];
};
