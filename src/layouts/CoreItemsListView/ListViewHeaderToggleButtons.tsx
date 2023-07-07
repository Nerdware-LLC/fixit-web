import { useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import ToggleButtonGroup, { toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";
import InboxIcon from "@mui/icons-material/Inbox";
import ListIcon from "@mui/icons-material/List";
import SendIcon from "@mui/icons-material/Send";
import TableViewSharpIcon from "@mui/icons-material/TableViewSharp";
import {
  listViewSettingsStore,
  type ListViewSettingsStoreKey,
  type ListOrTable,
} from "@cache/listviewSettingsStore";
import { ToggleButtonWithTooltip } from "@components/Buttons/ToggleButtonWithTooltip";
import type { ListViewListName } from "./types";

export const ListViewHeaderToggleButtons = ({
  listViewSettingsStoreKey,
  isMobilePageLayout,
}: ListViewHeaderToggleButtonsProps) => {
  const { listOrTable, listVisibility = null } =
    listViewSettingsStore[listViewSettingsStoreKey].useSubToStore();

  const slideContainerRef = useRef(null);

  // This useEffect ensures only 1 list is shown on mobile
  useEffect(() => {
    if (isMobilePageLayout && listVisibility !== null) {
      listViewSettingsStore[listViewSettingsStoreKey].mergeUpdate({
        listVisibility: { Inbox: !listVisibility.Inbox, Sent: listVisibility.Inbox },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobilePageLayout]);

  return (
    <StyledPaper
      elevation={0}
      className={listVisibility && listOrTable === "LIST" ? "show-expanded" : undefined}
      ref={slideContainerRef}
    >
      {!isMobilePageLayout && listVisibility && (
        <Slide in={listOrTable === "LIST"} direction="left" container={slideContainerRef.current}>
          <Box style={{ display: "flex", alignItems: "center", zIndex: 1 }}>
            <ToggleButtonGroup
              aria-label="list visibility toggle buttons"
              value={[
                ...(listVisibility.Inbox === true ? ["Inbox"] : []),
                ...(listVisibility.Sent === true ? ["Sent"] : []),
              ]}
              onChange={(event, newVisibleListNames: Array<ListViewListName> | null) => {
                listViewSettingsStore[listViewSettingsStoreKey].mergeUpdate({
                  listVisibility:
                    newVisibleListNames && newVisibleListNames.length > 0
                      ? newVisibleListNames.reduce(
                          (accum, listName) => ({ ...accum, [listName]: true }),
                          { Inbox: false, Sent: false }
                        )
                      : { Inbox: !listVisibility!.Inbox, Sent: listVisibility!.Inbox }, // (listVisibility can not be null here, hence the !s),
                });
              }}
            >
              <ToggleButtonWithTooltip
                value="Inbox"
                aria-label="inbox list visibility toggle"
                TooltipProps={{
                  title:
                    listVisibility.Inbox === false
                      ? "Show Inbox"
                      : listVisibility.Sent === true
                      ? "Hide Inbox"
                      : "Switch lists",
                }}
              >
                <InboxIcon />
              </ToggleButtonWithTooltip>
              <ToggleButtonWithTooltip
                value="Sent"
                aria-label="sent list visibility toggle"
                TooltipProps={{
                  title:
                    listVisibility.Sent === false
                      ? "Show Sent"
                      : listVisibility.Inbox === true
                      ? "Hide Sent"
                      : "Switch lists",
                }}
              >
                <SendIcon />
              </ToggleButtonWithTooltip>
            </ToggleButtonGroup>
            <Divider flexItem orientation="vertical" />
          </Box>
        </Slide>
      )}
      <ToggleButtonGroup
        aria-label="table or list view"
        value={listOrTable}
        exclusive
        style={{ zIndex: 5 }}
        onChange={(event: React.MouseEvent<HTMLElement>, newValue: ListOrTable | null) => {
          if (newValue !== null) {
            listViewSettingsStore[listViewSettingsStoreKey].mergeUpdate({ listOrTable: newValue });
          }
        }}
      >
        <ToggleButtonWithTooltip
          value="LIST"
          aria-label="list view"
          TooltipProps={{ title: "View List" }}
        >
          <ListIcon />
        </ToggleButtonWithTooltip>
        <ToggleButtonWithTooltip
          value="TABLE"
          aria-label="table view"
          TooltipProps={{ title: "View Table" }}
        >
          <TableViewSharpIcon />
        </ToggleButtonWithTooltip>
      </ToggleButtonGroup>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: theme.variables.isMobilePageLayout ? "2.5rem" : "3.1rem",
  overflow: "hidden",
  zIndex: 1,
  padding: 0,
  borderRadius: "0.75rem",
  display: "flex",
  alignItems: "stretch",
  justifyContent: "flex-end",
  border: theme.palette.mode === "dark" ? "none !important" : `1px solid ${theme.palette.divider}`,

  width: theme.variables.isMobilePageLayout ? "4.845rem" : "5.94rem",

  ...(!theme.variables.isMobilePageLayout && {
    transition: "width 0.225s",
    "&.show-expanded": {
      width: "12.6rem",
    },
  }),

  // ToggleButtonGroup comps:
  [`& .${toggleButtonGroupClasses.root}`]: {
    position: "relative",
    height: "100%",
    ...(theme.variables.isMobilePageLayout
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
    backgroundColor: theme.palette.background.paper,
    border: "none !important",
    "& > button": {
      position: "absolute",
      top: 0,
      bottom: 0,
      "&:first-of-type": { left: 0 },
      "&:not(:first-of-type)": { right: 0 },
      ...(theme.variables.isMobilePageLayout
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
    ...(theme.variables.isMobilePageLayout
      ? {
          display: "none",
        }
      : {
          margin: "0.65rem 0.3rem",
        }),
  },
}));

export type ListViewHeaderToggleButtonsProps = {
  listViewSettingsStoreKey: ListViewSettingsStoreKey;
  isMobilePageLayout: boolean;
};
