import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import { ListHeaderContainer } from "./ListHeaderContainer";
import { INBOX_LIST_NAMES } from "../ListViewHeaderToggleButtons";
import { listViewTabA11yProps, listViewTabsWrapperA11yProps } from "./tabA11yProps";
import type { ListVisibility } from "../ListViewHeaderToggleButtons";

export const MobileListHeaderTabs = ({
  listVisibility,
  toggleListVisibility
}: {
  listVisibility: ListVisibility;
  toggleListVisibility: () => void;
}) => (
  <ListHeaderContainer containsMobileListHeaderTabs>
    <StyledTabs
      value={listVisibility.Inbox === true ? 0 : 1}
      onChange={toggleListVisibility}
      {...listViewTabsWrapperA11yProps}
    >
      {INBOX_LIST_NAMES.map((listName) => (
        <Tab
          key={listName}
          label={listName}
          icon={listName === "Inbox" ? <InboxIcon /> : <SendIcon />}
          iconPosition="start"
          {...listViewTabA11yProps[listName]}
        />
      ))}
    </StyledTabs>
  </ListHeaderContainer>
);

const StyledTabs = styled(Tabs)({
  height: "100%",
  minHeight: "100%",
  maxHeight: "100%",
  width: "100%",

  "& .MuiTabs-flexContainer": {
    justifyContent: "space-evenly",

    "& > .MuiTab-root": {
      height: "2rem",
      minHeight: "2rem",
      maxHeight: "2rem",
      minWidth: "33%",
      padding: "0.4rem 0 0 0",

      "&:first-of-type": {
        marginLeft: "0.5rem",
        marginRight: "auto"
      },
      "&:not(:first-of-type)": {
        marginLeft: "auto",
        marginRight: "0.5rem"
      },

      "&:not(.Mui-selected)": {
        opacity: 0.5
      },

      "& > svg": {
        fontSize: "1.25rem",
        marginLeft: "-0.1rem"
      }
    }
  }
});
