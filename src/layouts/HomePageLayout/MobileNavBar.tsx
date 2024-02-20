import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiBottomNavBar, { type BottomNavigationProps } from "@mui/material/BottomNavigation";
import { bottomNavigationActionClasses } from "@mui/material/BottomNavigationAction";
import { useAppNavActions } from "@/routes/appNavActions";
import { APP_PATHS } from "@/routes/appPaths";
import { MobileNavBarTab } from "./MobileNavBarTab";
import { homePageLayoutElementIDs } from "./elementIDs";
import { homePageLayoutSharedStyles } from "./styles";

export const MobileNavBar = ({ initialActiveTabPath = APP_PATHS.HOME }: MobileNavBarProps) => {
  const [activeTab, setActiveTab] = useState(initialActiveTabPath);
  const { DASHBOARD, WORK_ORDERS_LIST_VIEW, INVOICES_LIST_VIEW, CONTACTS_LIST_VIEW } =
    useAppNavActions();

  const handleChange: BottomNavigationProps["onChange"] = (_event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <StyledBottomNavBar
        id={homePageLayoutElementIDs.mobileNavBar.root}
        showLabels
        value={activeTab}
        onChange={handleChange}
      >
        <MobileNavBarTab {...DASHBOARD} />
        <MobileNavBarTab {...WORK_ORDERS_LIST_VIEW} />
        <MobileNavBarTab {...INVOICES_LIST_VIEW} />
        <MobileNavBarTab {...CONTACTS_LIST_VIEW} />
      </StyledBottomNavBar>
      <div id={homePageLayoutElementIDs.mobileNavBar.fixedPositionOffset} />
    </>
  );
};

const StyledBottomNavBar = styled(MuiBottomNavBar)(({ theme: { palette } }) => {
  // The nav bar and its offset share the same dimensions:
  const sharedStyles = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: homePageLayoutSharedStyles.mobileNavBarHeight,
    width: "100%",
  } satisfies React.CSSProperties;

  return {
    borderWidth: "1px 0 0 0",
    borderStyle: "solid",
    borderColor: palette.divider,
    boxShadow:
      palette.mode === "dark"
        ? `0 3px 8px 8px rgba(0,0,0,0.5)`
        : // light mode boxShadow is the same as Mui `boxShadow: 3` (not sure why, but using the integer didn't work here)
          `0 -3px 3px -2px rgba(0,0,0,0.2), 0 -3px 4px 0 rgba(0,0,0,0.14), 0 -1px 8px 0 rgba(0,0,0,0.12)`,
    zIndex: 10, // <-- ensures the box-shadow appears above other elements

    ...sharedStyles,
    [`& + #${homePageLayoutElementIDs.mobileNavBar.fixedPositionOffset}`]: {
      ...sharedStyles,
    },

    /* BETTER NAV-BAR TAB SPACING:
    By default, the tabs are all the same width, which seems reasonable at first,
    BUT when 1+ tab LABELS are longer than others (e.g., "Work Orders" vs "Invoices"),
    this causes the longer-labeled tab(s) to appear too close to their neighbors. To
    fix this, we re-style the tabs to allow them to shrink to fit their contents, and
    the container is set to justifyContent="space-evenly" to evenly space the tabs.*/
    justifyContent: "space-evenly",
    [`& > .${bottomNavigationActionClasses.root}`]: {
      minWidth: "min-content",
      flexGrow: 0,
      padding: "0 0.5rem", // <-- shrinks horizontal padding from 12px to 8px
      [`& > .${bottomNavigationActionClasses.label}`]: {
        whiteSpace: "nowrap", // <-- ensures "Work Orders" does not wrap
      },
    },
  };
});

export type MobileNavBarProps = {
  initialActiveTabPath?: (typeof APP_PATHS)[
    | "HOME"
    | "WORK_ORDERS_LIST_VIEW"
    | "INVOICES_LIST_VIEW"
    | "CONTACTS_LIST_VIEW"];
};
