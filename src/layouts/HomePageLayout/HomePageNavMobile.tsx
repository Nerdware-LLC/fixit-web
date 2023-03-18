import { useState } from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ToolsIcon from "@mui/icons-material/Construction";
import ContactsIcon from "@mui/icons-material/Group";
import { FileInvoiceDollarIcon } from "@components";
import { useHomePageNav } from "./useHomePageNav";

export const HomePageNavMobile = () => {
  const [activeTab, setActiveTab] = useState("/home");

  return (
    <>
      <StyledBottomNavBar
        id="homepage-mobile-nav-tabs"
        showLabels
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
      >
        <BottomTabLink label="Dashboard" path="/home" icon={<DashboardIcon />} />
        <BottomTabLink label="Work Orders" path="/home/workorders" icon={<ToolsIcon />} />
        <BottomTabLink label="Invoices" path="/home/invoices" icon={<FileInvoiceDollarIcon />} />
        <BottomTabLink label="Contacts" path="/home/contacts" icon={<ContactsIcon />} />
      </StyledBottomNavBar>
      <div id="homepage-mobile-nav-tabs-fixed-position-offset" />
    </>
  );
};

const BottomTabLink = ({
  label,
  path,
  icon = null
}: {
  path: string;
} & React.ComponentProps<typeof BottomNavigationAction>) => {
  const { isActive } = useHomePageNav(path);

  return (
    <BottomNavigationAction
      className="homepage-mobile-nav-tab"
      component={Link}
      label={label}
      value={label}
      to={path}
      icon={icon}
      sx={({ palette }) => ({
        color: isActive ? palette.secondary.main : alpha(palette.action.active, 0.9)
      })}
    />
  );
};

export const NAV_BAR_SIZE = {
  height: "3.5rem",
  width: "100%"
};

const StyledBottomNavBar = styled(BottomNavigation)(({ theme }) => ({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  borderWidth: "1px 0 0 0",
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 3px 8px 8px rgba(0,0,0,0.5)`
      : // light mode boxShadow is the same as Mui `boxShadow: 3` (not sure why, but using the integer didn't work here)
        `0 -3px 3px -2px rgba(0,0,0,0.2), 0 -3px 4px 0 rgba(0,0,0,0.14), 0 -1px 8px 0 rgba(0,0,0,0.12)`,
  zIndex: 10, // <-- ensures the box-shadow appears above other elements

  ...NAV_BAR_SIZE,
  "& + #homepage-mobile-nav-tabs-fixed-position-offset": NAV_BAR_SIZE,

  // The tabs' label
  "& .MuiBottomNavigationAction-label": {
    whiteSpace: "nowrap"
  }
}));
