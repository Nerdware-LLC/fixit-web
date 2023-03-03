import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ToolsIcon from "@mui/icons-material/Construction";
import ContactsIcon from "@mui/icons-material/Group";
import { THEMES } from "@app/ThemeProvider";
import { TitleLogo, FileInvoiceDollarIcon, AddressCardIcon } from "@components";
import { APP_BAR_HEIGHT } from "@layouts/PageContainer/AppBar";
import { AccountDrawerBtn, ConnectDrawerBtn, NavDrawerBtn } from "./HomePageDrawerButtons";

export const HomePageNavDesktop = () => {
  const nav = useNavigate();

  return (
    <StyledDrawer variant="permanent" anchor="left" open>
      <TitleLogo onClick={() => nav("/home")} />
      <Divider />
      <List>
        <NavDrawerBtn label="Dashboard" path="/home" icon={<DashboardIcon />} />
        <NavDrawerBtn label="Work Orders" path="/home/workorders" icon={<ToolsIcon />} />
        <NavDrawerBtn label="Invoices" path="/home/invoices" icon={<FileInvoiceDollarIcon />} />
        <NavDrawerBtn label="Contacts" path="/home/contacts" icon={<ContactsIcon />} />
        <div className="drawer-bottom-buttons-container">
          <Divider />
          <AccountDrawerBtn label="Account" />
          <NavDrawerBtn label="Profile" path="/home/profile" icon={<AddressCardIcon />} />
          <ConnectDrawerBtn />
        </div>
      </List>
    </StyledDrawer>
  );
};

// Exported so HomePageLayout can use in css calc for content-area size
export const DRAWER_WIDTH = "clamp(12.5rem, 20%, 14rem)";

/**
 * The drawer always reflects dark mode coloration
 */
const StyledDrawer = styled(Drawer)({
  // The visible outer flex-col container:
  "& > div.MuiDrawer-paper": {
    height: "100vh",
    width: DRAWER_WIDTH,
    overflowY: "clip",
    backgroundColor: THEMES.DARK.palette.background.paper,

    // TitleLogo styles:
    "& > div.title-logo-container": {
      height: `calc(${APP_BAR_HEIGHT.DESKTOP} - 1px)`,
      padding: "0 0 0 1.03rem",
      justifyContent: "flex-start",
      "& > .title-logo-img": {
        width: "2.5rem",
        marginRight: "0.5rem"
      },
      "& > .title-logo-text": {
        fontSize: "1.5rem",
        color: THEMES.DARK.palette.text.primary
      }
    },

    // The Mui List component:
    "& > .MuiList-root": {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",

      // col flex-end buttons container:
      "& div.drawer-bottom-buttons-container": {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        // Divider at the top of the buttons at the bottom of the drawer:
        "& > hr.MuiDivider-root": {
          marginBottom: "0.5rem"
        }
      }
    }
  }
});
