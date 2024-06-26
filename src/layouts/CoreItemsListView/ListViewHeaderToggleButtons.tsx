import { useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
  type ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import InboxIcon from "@mui/icons-material/Inbox";
import ListIcon from "@mui/icons-material/List";
import SendIcon from "@mui/icons-material/Send";
import TableViewSharpIcon from "@mui/icons-material/TableViewSharp";
import { ToggleButtonWithTooltip } from "@/components/Buttons/ToggleButtonWithTooltip.jsx";
import {
  listViewSettingsStore,
  type ListViewSettingsStoreKey,
} from "@/stores/listviewSettingsStore.js";
import { capitalize } from "@/utils/formatters/strings.js";
import {
  LIST_VIEW_MODES,
  LIST_VIEW_LIST_NAMES,
  type ListViewMode,
  type ListViewListName,
} from "./types.js";
import type { IsMobilePageLayout } from "@/app/PageLayoutContext";

export const ListViewHeaderToggleButtons = ({
  listViewSettingsStoreKey,
  isMobilePageLayout,
}: ListViewHeaderToggleButtonsProps) => {
  const { viewMode, listVisibility } =
    listViewSettingsStore[listViewSettingsStoreKey].useSubToStore();

  const slideContainerRef = useRef(null);

  /**
   * Show the list-visibility toggle buttons if:
   * - The list-view is not in mobile-page-layout, in which space is a bit too constrained.
   * - The list-view includes `Inbox` and `Sent` lists.
   * - The list-view is not the ContactsListView, which only has 1 list and therefore doesn't use list-vis.
   */
  const showListVisibilityToggleButtons =
    !isMobilePageLayout && !!listVisibility && listViewSettingsStoreKey !== "contacts";

  // EFFECT: ensure only 1 list is shown on mobile
  useEffect(() => {
    if (isMobilePageLayout && listVisibility && listViewSettingsStoreKey !== "contacts") {
      listViewSettingsStore[listViewSettingsStoreKey].mergeUpdate({
        listVisibility: {
          Inbox: !listVisibility.Inbox,
          Sent: listVisibility.Inbox,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobilePageLayout]);

  // onChange handler for the "ListViewMode" ToggleButtonGroup:
  const handleChangeListViewMode: ToggleButtonGroupProps["onChange"] = (
    _event,
    newValue: ListViewMode | null
  ) => {
    if (newValue) {
      listViewSettingsStore[listViewSettingsStoreKey].mergeUpdate({ viewMode: newValue });
    }
  };

  // onChange handler for the "ListVisibility" ToggleButtonGroup:
  const handleChangeListVisibility: ToggleButtonGroupProps["onChange"] = (
    _event,
    newVisibleListNames: Array<ListViewListName> | null
  ) => {
    // Do nothing if the list-view doesn't use ListVisibility (e.g. ContactsListView)
    if (listVisibility && listViewSettingsStoreKey !== "contacts") {
      // Determine the new listVisibility state based on the newVisibleListNames:
      const newListVisibility =
        newVisibleListNames && newVisibleListNames.length > 0
          ? newVisibleListNames.reduce((accum, listName) => ({ ...accum, [listName]: true }), {
              Inbox: false,
              Sent: false,
            })
          : { Inbox: !listVisibility.Inbox, Sent: listVisibility.Inbox };
      // Update the listVisibility state:
      listViewSettingsStore[listViewSettingsStoreKey].mergeUpdate({
        listVisibility: newListVisibility,
      });
    }
  };

  return (
    <StyledPaper
      elevation={0}
      ref={slideContainerRef}
      className={
        showListVisibilityToggleButtons && viewMode === LIST_VIEW_MODES.LIST
          ? "show-expanded"
          : undefined
      }
    >
      {showListVisibilityToggleButtons && (
        <Slide
          in={viewMode === LIST_VIEW_MODES.LIST}
          direction="left"
          container={slideContainerRef.current}
        >
          <Box style={{ display: "flex", alignItems: "center", zIndex: 1 }}>
            <ToggleButtonGroup
              aria-label="list visibility toggle buttons"
              onChange={handleChangeListVisibility}
              value={[
                ...(listVisibility.Inbox === true ? [LIST_VIEW_LIST_NAMES.INBOX] : []),
                ...(listVisibility.Sent === true ? [LIST_VIEW_LIST_NAMES.SENT] : []),
              ]}
            >
              {LIST_VISIBILITY_TOGGLE_BUTTON_CONFIGS.map(({ listName, otherListName, icon }) => (
                <ToggleButtonWithTooltip
                  key={listName}
                  value={listName}
                  aria-label={`${listName} list visibility toggle`}
                  TooltipProps={{
                    title:
                      listVisibility[listName] === false
                        ? `Show ${listName}`
                        : listVisibility[otherListName] === true
                          ? `Hide ${listName}`
                          : "Switch lists",
                  }}
                >
                  {icon}
                </ToggleButtonWithTooltip>
              ))}
            </ToggleButtonGroup>
            <Divider flexItem orientation="vertical" />
          </Box>
        </Slide>
      )}
      <ToggleButtonGroup
        aria-label="table or list view"
        value={viewMode}
        onChange={handleChangeListViewMode}
        exclusive
        style={{ zIndex: 5 }}
      >
        {LIST_VIEW_MODE_TOGGLE_BUTTON_CONFIGS.map(({ viewMode, icon }) => (
          <ToggleButtonWithTooltip
            key={viewMode}
            value={viewMode}
            aria-label={`${viewMode} view`}
            TooltipProps={{ title: `View ${capitalize(viewMode)}` }}
          >
            {icon}
          </ToggleButtonWithTooltip>
        ))}
      </ToggleButtonGroup>
    </StyledPaper>
  );
};

const LIST_VIEW_MODE_TOGGLE_BUTTON_CONFIGS = [
  { viewMode: LIST_VIEW_MODES.LIST, icon: <ListIcon /> },
  { viewMode: LIST_VIEW_MODES.TABLE, icon: <TableViewSharpIcon /> },
] as const;

const LIST_VISIBILITY_TOGGLE_BUTTON_CONFIGS = [
  {
    listName: LIST_VIEW_LIST_NAMES.INBOX,
    otherListName: LIST_VIEW_LIST_NAMES.SENT, // used to determine the tooltip `title`
    icon: <InboxIcon />,
  },
  {
    listName: LIST_VIEW_LIST_NAMES.SENT,
    otherListName: LIST_VIEW_LIST_NAMES.INBOX,
    icon: <SendIcon />,
  },
] as const;

const StyledPaper = styled(Paper)(({ theme: { palette, variables } }) => ({
  height: variables.isMobilePageLayout ? "2.5rem" : "3.1rem",
  overflow: "hidden",
  zIndex: 1,
  padding: 0,
  borderRadius: "0.75rem",
  display: "flex",
  alignItems: "stretch",
  justifyContent: "flex-end",
  border: palette.mode === "dark" ? "none !important" : `1px solid ${palette.divider}`,

  width: variables.isMobilePageLayout ? "4.845rem" : "5.94rem",

  ...(!variables.isMobilePageLayout && {
    transition: "width 0.225s",
    "&.show-expanded": {
      width: "12.6rem",
      minWidth: "min-content",
    },
  }),

  // ToggleButtonGroup comps:
  [`& .${toggleButtonGroupClasses.root}`]: {
    position: "relative",
    height: "100%",
    ...(variables.isMobilePageLayout
      ? {
          width: "4.8rem",
          minWidth: "4.8rem",
          maxWidth: "4.8rem",
        }
      : {
          width: "5.94rem",
          minWidth: "5.94rem",
          maxWidth: "5.94rem",
        }),
    opacity: 1,
    zIndex: 1,
    backgroundColor: palette.background.paper,
    border: "none !important",
    "& > button": {
      position: "absolute",
      top: 0,
      bottom: 0,
      "&:first-of-type": { left: 0 },
      "&:not(:first-of-type)": { right: 0 },
      ...(variables.isMobilePageLayout
        ? {
            height: "2rem",
            width: "2rem",
            minWidth: "2rem",
            maxWidth: "2rem",
            margin: "0.25rem",
          }
        : {
            height: "2.499rem",
            width: "2.5rem",
            minWidth: "2.5rem",
            maxWidth: "2.5rem",
            margin: "0.3rem",
          }),
      border: "none !important",
      borderRadius: "0.5rem",
    },
  },

  [`& .${dividerClasses.root}`]: {
    ...(variables.isMobilePageLayout ? { display: "none" } : { margin: "0.65rem 0.3rem" }),
  },
}));

export type ListViewHeaderToggleButtonsProps = {
  listViewSettingsStoreKey: ListViewSettingsStoreKey;
} & IsMobilePageLayout;
