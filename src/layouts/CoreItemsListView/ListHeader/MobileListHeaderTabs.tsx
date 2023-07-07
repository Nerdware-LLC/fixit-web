import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import { listViewSettingsStore, type ListViewSettingsStoreKey } from "@cache/listviewSettingsStore";
import { ListHeaderContainer } from "./ListHeaderContainer";
import { listViewTabA11yProps, listViewTabsWrapperA11yProps } from "./tabA11yProps";
import { LIST_VIEW_LIST_NAMES } from "../types";

export const MobileListHeaderTabs = ({ listViewSettingsStoreKey }: MobileListHeaderTabsProps) => {
  const { listVisibility } = listViewSettingsStore[listViewSettingsStoreKey].useSubToStore();

  return (
    <ListHeaderContainer containsMobileListHeaderTabs>
      <StyledTabs
        value={listVisibility.Inbox === true ? 0 : 1}
        onChange={() => {
          listViewSettingsStore[listViewSettingsStoreKey].mergeUpdate({
            listVisibility: {
              Inbox: !listVisibility.Inbox,
              Sent: listVisibility.Inbox,
            },
          });
        }}
        {...listViewTabsWrapperA11yProps}
      >
        {LIST_VIEW_LIST_NAMES.map((listName) => (
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
};

const StyledTabs = styled(Tabs)({
  height: "100%",
  minHeight: "100%",
  maxHeight: "100%",
  width: "100%",

  [`& .${tabsClasses.flexContainer}`]: {
    justifyContent: "space-evenly",

    [`& > .${tabClasses.root}`]: {
      height: "2rem",
      minHeight: "2rem",
      maxHeight: "2rem",
      minWidth: "33%",
      padding: "0.4rem 0 0 0",

      "&:first-of-type": {
        marginLeft: "0.5rem",
        marginRight: "auto",
      },
      "&:not(:first-of-type)": {
        marginLeft: "auto",
        marginRight: "0.5rem",
      },

      [`&:not(.${tabClasses.selected})`]: {
        opacity: 0.5,
      },

      "& > svg": {
        fontSize: "1.25rem",
        marginLeft: "-0.1rem",
      },
    },
  },
});

export type MobileListHeaderTabsProps = {
  listViewSettingsStoreKey: ListViewSettingsStoreKey;
};
