import { useRef } from "react";
import { styled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import TableViewSharpIcon from "@mui/icons-material/TableViewSharp";
import ListIcon from "@mui/icons-material/List";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import { ToggleButtonWithTooltip } from "@components";
import { useListViewHeaderToggleButtons } from "./useListViewHeaderToggleButtons";
import type {
  ListOrTable,
  HandleChangeListOrTable,
  ListVisibility,
  HandleChangeListVisibility
} from "./types";

export const ListViewHeaderToggleButtons = ({
  listOrTable,
  handleChangeListOrTable,
  listVisibility,
  handleChangeListVisibility
}: {
  listOrTable: ListOrTable;
  handleChangeListOrTable: HandleChangeListOrTable;
  listVisibility?: ListVisibility;
  handleChangeListVisibility?: HandleChangeListVisibility;
}) => {
  const slideContainerRef = useRef(null);

  return (
    <ListViewHeaderToggleButtonsContainer
      elevation={0}
      className={listVisibility && listOrTable === "LIST" ? "show-expanded" : undefined}
      ref={slideContainerRef}
    >
      {listVisibility && (
        <Slide in={listOrTable === "LIST"} direction="left" container={slideContainerRef.current}>
          <Box style={{ display: "flex", alignItems: "center", zIndex: 1 }}>
            <ToggleButtonGroup
              value={[
                ...(listVisibility.Inbox === true ? ["Inbox"] : []),
                ...(listVisibility.Sent === true ? ["Sent"] : [])
              ]}
              onChange={handleChangeListVisibility}
              aria-label="list visibility toggle buttons"
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
                      : "Switch lists"
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
                      : "Switch lists"
                }}
              >
                <SendIcon />
              </ToggleButtonWithTooltip>
            </ToggleButtonGroup>
            <Divider flexItem orientation="vertical" sx={{ mx: "0.3rem", my: "0.65rem" }} />
          </Box>
        </Slide>
      )}
      <ToggleButtonGroup
        value={listOrTable}
        onChange={handleChangeListOrTable}
        exclusive
        aria-label="table or list view"
        style={{ zIndex: 5 }}
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
    </ListViewHeaderToggleButtonsContainer>
  );
};

// For convenient imports:
ListViewHeaderToggleButtons.use = useListViewHeaderToggleButtons;

const ListViewHeaderToggleButtonsContainer = styled(Paper)(({ theme }) => ({
  height: "3.1rem",
  overflow: "hidden",
  zIndex: 1,
  padding: 0,
  borderRadius: "0.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  ...(theme.palette.mode === "light" && {
    border: `1px solid ${theme.palette.divider}`
  }),

  width: "6rem",
  transition: "width 0.225s",
  "&.show-expanded": {
    width: "12.5rem"
  },

  // ToggleButtonGroup comps:
  "& .MuiToggleButtonGroup-root": {
    opacity: 1,
    backgroundColor: theme.palette.background.paper,
    alignItems: "center",
    justifyContent: "space-evenly",
    "& > button": {
      height: "2.5rem",
      width: "2.5rem",
      marginTop: "0.3rem",
      marginBottom: "0.3rem",
      border: 0,
      borderRadius: "0.5rem"
    },
    "& > button:first-of-type": {
      marginLeft: "0.3rem !important",
      marginRight: "0.15rem !important"
    },
    "& > button:not(:first-of-type)": {
      marginLeft: "0.15rem !important",
      marginRight: "0.3rem !important"
    }
  }
}));
