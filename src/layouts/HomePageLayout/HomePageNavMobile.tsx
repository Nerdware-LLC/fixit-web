import { useState } from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import NavBarAction, { bottomNavigationActionClasses } from "@mui/material/BottomNavigationAction";
import ToolsIcon from "@mui/icons-material/Construction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactsIcon from "@mui/icons-material/Group";
import { FileInvoiceDollarIcon } from "@components/Icons/FileInvoiceDollarIcon";
import { useHomePageNav } from "./useHomePageNav";
import type { BottomNavigationActionProps } from "@mui/material/BottomNavigationAction";

export const HomePageNavMobile = () => {
  const [activeTab, setActiveTab] = useState("/home");

  return (
    <>
      <StyledBottomNavBar
        id={homePageNavMobileElementIDs.root}
        showLabels
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
      >
        <BottomTabLink label="Dashboard" path="/home" icon={<DashboardIcon />} />
        <BottomTabLink label="Work Orders" path="/home/workorders" icon={<ToolsIcon />} />
        <BottomTabLink label="Invoices" path="/home/invoices" icon={<FileInvoiceDollarIcon />} />
        <BottomTabLink label="Contacts" path="/home/contacts" icon={<ContactsIcon />} />
      </StyledBottomNavBar>
      <div id={homePageNavMobileElementIDs.fixedPositionOffset} />
    </>
  );
};

export const homePageNavMobileElementIDs = {
  root: "homepage-mobile-nav-tabs",
  fixedPositionOffset: "homepage-mobile-nav-tabs-fixed-position-offset",
};

const BottomTabLink = ({
  label,
  path,
  icon = null,
}: { path: string } & BottomNavigationActionProps) => {
  const { isActive } = useHomePageNav(path);

  return (
    <NavBarAction
      component={Link}
      label={label}
      value={label}
      to={path}
      icon={icon}
      sx={({ palette }) => ({
        color: isActive ? palette.secondary.main : alpha(palette.action.active, 0.9),
      })}
    />
  );
};

const StyledBottomNavBar = styled(BottomNavigation)(({ theme }) => {
  // The nav bar and its offset share the same dimensions:
  const sharedStyles = {
    height: "var(--mobile-nav-bar-height, 3.5rem)",
    width: "100%",
  };

  return {
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

    ...sharedStyles,
    [`& + #${homePageNavMobileElementIDs.fixedPositionOffset}`]: sharedStyles,

    // The tabs' label
    [`& .${bottomNavigationActionClasses.label}`]: {
      whiteSpace: "nowrap",
    },
  };
});
