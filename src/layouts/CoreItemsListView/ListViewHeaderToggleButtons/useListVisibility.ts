import { useReducer, useEffect } from "react";
import type { ListVisibility, HandleChangeListVisibility, InboxListName } from "./types";

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
  Sent: initIsSentVisible,
  isMobilePageLayout
}: Partial<ListVisibility & { isMobilePageLayout: boolean }> = {}) => {
  const [listVisibility, dispatch] = useReducer(
    listVisibilityReducer,
    isMobilePageLayout
      ? {
          Inbox: initIsSentVisible !== true,
          Sent: initIsSentVisible === true
        }
      : {
          Inbox: initIsInboxVisible ?? true,
          Sent: initIsSentVisible ?? true
        }
  );

  // This useEffect ensures only 1 list is shown on mobile
  useEffect(() => {
    if (isMobilePageLayout && listVisibility.Inbox && listVisibility.Sent) {
      dispatch({ type: "UPDATE", newVisibleListNames: ["Inbox"] });
    }
  }, [isMobilePageLayout, listVisibility.Inbox, listVisibility.Sent]);

  const toggleListVisibility = () => dispatch({ type: "TOGGLE" });
  const handleChangeListVisibility: HandleChangeListVisibility = (event, newVisibleListNames) => {
    dispatch(newVisibleListNames ? { type: "UPDATE", newVisibleListNames } : { type: "TOGGLE" });
  };

  return {
    listVisibility,
    handleChangeListVisibility,
    toggleListVisibility
  };
};

/**
 * To ensure at least 1 list is always visible, if "newVisibleListNames" is empty or
 * isMobilePageLayout is true, simply swap list visibility, else run reducer which starts
 * with both existing lists set to false and flipped to true if in newVisibleListNames.
 */
const listVisibilityReducer = (
  state: ListVisibility,
  {
    type,
    newVisibleListNames
  }: { type: "TOGGLE" | "UPDATE"; newVisibleListNames?: Array<InboxListName> }
) => {
  return type === "UPDATE" && newVisibleListNames && newVisibleListNames.length > 0
    ? newVisibleListNames.reduce((accum, listName) => ({ ...accum, [listName]: true }), {
        Inbox: false,
        Sent: false
      })
    : {
        Inbox: !state.Inbox,
        Sent: state.Inbox
      };
};
