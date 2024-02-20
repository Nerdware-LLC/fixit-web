import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import { getTabA11yProps } from "@/components/Tabs/helpers";
import {
  listViewSettingsStore,
  type ListViewSettingsStoreKey,
} from "@/stores/listviewSettingsStore";
import { ListHeaderContainer } from "./ListHeaderContainer";
import { LIST_VIEW_LIST_NAMES } from "../types";

export const MobileListHeaderTabs = ({ listViewSettingsStoreKey }: MobileListHeaderTabsProps) => {
  const { listVisibility } = listViewSettingsStore[listViewSettingsStoreKey].useSubToStore();

  const handleSwitchTab = () => {
    listViewSettingsStore[listViewSettingsStoreKey].mergeUpdate({
      listVisibility: {
        Inbox: !listVisibility.Inbox,
        Sent: listVisibility.Inbox,
      },
    });
  };

  return (
    <ListHeaderContainer containsMobileListHeaderTabs>
      <StyledTabs
        aria-label="Inbox and Sent list view tabs"
        value={listVisibility.Inbox === true ? 0 : 1}
        onChange={handleSwitchTab}
      >
        <Tab
          label={LIST_VIEW_LIST_NAMES.INBOX}
          icon={<InboxIcon />}
          iconPosition="start"
          {...getTabA11yProps(LIST_VIEW_LIST_NAMES.INBOX)}
        />
        <Tab
          label={LIST_VIEW_LIST_NAMES.SENT}
          icon={<SendIcon />}
          iconPosition="start"
          {...getTabA11yProps(LIST_VIEW_LIST_NAMES.SENT)}
        />
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
  listViewSettingsStoreKey: Exclude<ListViewSettingsStoreKey, "contacts">;
};
