import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import List, { listClasses } from "@mui/material/List";
import ConstructionIcon from "@mui/icons-material/Construction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import { THEMES } from "@app/ThemeProvider";
import { TitleLogo, titleLogoClassNames } from "@components/Branding/TitleLogo";
import { AddressCardIcon } from "@components/Icons/AddressCardIcon";
import { FileInvoiceDollarIcon } from "@components/Icons/FileInvoiceDollarIcon";
import { AccountDrawerBtn, ConnectDrawerBtn, NavDrawerBtn } from "./HomePageDrawerButtons";

export const HomePageNavDesktop = () => {
  const nav = useNavigate();

  return (
    <StyledDrawer variant="permanent" anchor="left" open>
      <TitleLogo onClick={() => nav("/home")} />
      <Divider />
      <List>
        <NavDrawerBtn label="Dashboard" path="/home" icon={<DashboardIcon />} />
        <NavDrawerBtn label="Work Orders" path="/home/workorders" icon={<ConstructionIcon />} />
        <NavDrawerBtn label="Invoices" path="/home/invoices" icon={<FileInvoiceDollarIcon />} />
        <NavDrawerBtn label="Contacts" path="/home/contacts" icon={<GroupIcon />} />
        <div>
          <Divider />
          <AccountDrawerBtn label="Account" />
          <NavDrawerBtn label="Profile" path="/home/profile" icon={<AddressCardIcon />} />
          <ConnectDrawerBtn />
        </div>
      </List>
    </StyledDrawer>
  );
};

/**
 * The drawer always reflects dark mode coloration
 */
const StyledDrawer = styled(Drawer)({
  // The visible outer flex-col container:
  [`& > .${drawerClasses.paper}`]: {
    height: "100vh",
    width: "var(--desktop-nav-drawer-width, clamp(12.5rem,20%,14rem))",
    overflowY: "clip",
    backgroundColor: THEMES.DARK.palette.background.paper,

    // TitleLogo styles:
    [`& > .${titleLogoClassNames.container}`]: {
      height: `calc( var(--app-bar-height,3rem) - 1px )`,
      padding: "0 0 0 1.03rem",
      justifyContent: "flex-start",
      [`& > .${titleLogoClassNames.logoImg}`]: {
        width: "2.5rem",
        marginRight: "0.5rem",
      },
      [`& > .${titleLogoClassNames.logoText}`]: {
        fontSize: "1.5rem",
        color: THEMES.DARK.palette.text.primary,
      },
    },

    // The Mui List component:
    [`& > .${listClasses.root}`]: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",

      // col flex-end buttons container:
      "& > div:last-of-type": {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        // Divider at the top of the buttons at the bottom of the drawer:
        [`& > hr.${dividerClasses.root}`]: {
          marginBottom: "0.5rem",
        },
      },
    },
  },
});
