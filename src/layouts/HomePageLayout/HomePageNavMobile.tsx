import { useState } from "react";
import { Link } from "react-router-dom";
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
      <BottomNavigation
        id="homepage-mobile-nav-tabs"
        showLabels
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        sx={({ palette }) => ({
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          borderWidth: "1px 0 0 0",
          borderStyle: "solid",
          borderColor: palette.divider,
          boxShadow: `0 0.5rem 1rem 1rem ${palette.background.default}`,
          ...NAV_BAR_SIZE,
          "& + #homepage-mobile-nav-tabs-fixed-position-offset": NAV_BAR_SIZE
        })}
      >
        <BottomTabLink label="Dashboard" path="/home" icon={<DashboardIcon />} />
        <BottomTabLink label="Work Orders" path="/home/workorders" icon={<ToolsIcon />} />
        <BottomTabLink label="Invoices" path="/home/invoices" icon={<FileInvoiceDollarIcon />} />
        <BottomTabLink label="Contacts" path="/home/contacts" icon={<ContactsIcon />} />
      </BottomNavigation>
      <div id="homepage-mobile-nav-tabs-fixed-position-offset" />
    </>
  );
};

export const NAV_BAR_SIZE = {
  height: "3.5rem",
  width: "100vw"
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
      showLabel={true}
      sx={({ palette }) => ({
        color: isActive ? palette.secondary.main : palette.action.active,
        "& > .MuiBottomNavigationAction-label": {
          whiteSpace: "nowrap"
        }
      })}
    />
  );
};
