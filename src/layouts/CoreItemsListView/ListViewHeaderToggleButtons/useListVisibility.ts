import { useState } from "react";
import { usePageLayoutContext } from "@app";
import type { ListVisibility, HandleChangeListVisibility } from "./types";

/**
 * Initial visibility values:
 *
 * - if NOT MOBILE:
 *     - allow both lists to be visible
 *     - respect any explicit prop values
 *     - both default to true
 * - if MOBILE:
 *     - only 1 list can be visible at a time
 *     - unless init Sent is explicitly true, start with Inbox
 *     - visibility changes reflect toggle behavior
 */
export const useListVisibility = ({
  Inbox: initIsInboxVisible,
  Sent: initIsSentVisible
}: Partial<ListVisibility> = {}) => {
  const { isMobilePageLayout } = usePageLayoutContext();

  const [listVisibility, setListVisibility] = useState(
    !isMobilePageLayout
      ? {
          Inbox: initIsInboxVisible ?? true,
          Sent: initIsSentVisible ?? true
        }
      : {
          Inbox: initIsSentVisible !== true,
          Sent: initIsSentVisible === true
        }
  );

  const handleChangeListVisibility: HandleChangeListVisibility = (event, newVisibleListNames) => {
    /* To ensure at least 1 list is always visible, if "newVisibleListNames" is empty or
    isMobilePageLayout is true, simply swap list visibility, else run reducer which starts
    with both list's vis set to false and switches them true if in newVisibleListNames. */
    setListVisibility(
      newVisibleListNames && newVisibleListNames.length !== 0 && !isMobilePageLayout
        ? newVisibleListNames.reduce((accum, listName) => ({ ...accum, [listName]: true }), {
            Inbox: false,
            Sent: false
          })
        : {
            Inbox: !listVisibility.Inbox,
            Sent: listVisibility.Inbox
          }
    );
  };

  return {
    listVisibility,
    handleChangeListVisibility
  };
};
