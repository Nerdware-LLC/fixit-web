import { styled } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import List, { listClasses } from "@mui/material/List";
import { THEMES } from "@/app/ThemeProvider";
import { AppBarLogoButton } from "@/components/AppBar/AppBarLogoButton.jsx";
import { useAppBarHeight } from "@/components/AppBar/helpers.js";
import { brandingClassNames } from "@/components/Branding";
import { useAppNavActions } from "@/routes/appNavActions";
import { isConnectOnboardingCompleteStore } from "@/stores";
import { DesktopNavDrawerButton } from "./DesktopNavDrawerButton.jsx";
import { homePageLayoutSharedStyles } from "./styles.js";

export const DesktopNavDrawer = () => {
  const isConnectOnboardingComplete = isConnectOnboardingCompleteStore.useSubToStore();
  const appNavActions = useAppNavActions();

  const {
    DASHBOARD,
    WORK_ORDERS_LIST_VIEW,
    INVOICES_LIST_VIEW,
    CONTACTS_LIST_VIEW,
    STRIPE_CUSTOMER_DASHBOARD,
    PROFILE,
    STRIPE_CONNECT_ONBOARDING,
    STRIPE_CONNECT_DASHBOARD,
  } = appNavActions;

  return (
    <StyledDrawer variant="permanent" anchor="left" open>
      <AppBarLogoButton />
      <Divider />
      <List>
        <DesktopNavDrawerButton {...DASHBOARD} />
        <DesktopNavDrawerButton {...WORK_ORDERS_LIST_VIEW} />
        <DesktopNavDrawerButton {...INVOICES_LIST_VIEW} />
        <DesktopNavDrawerButton {...CONTACTS_LIST_VIEW} />
        <div>
          <Divider />
          <DesktopNavDrawerButton {...STRIPE_CUSTOMER_DASHBOARD} />
          <DesktopNavDrawerButton {...PROFILE} />
          {isConnectOnboardingComplete ? (
            <DesktopNavDrawerButton {...STRIPE_CONNECT_DASHBOARD} />
          ) : (
            <DesktopNavDrawerButton {...STRIPE_CONNECT_ONBOARDING} />
          )}
        </div>
      </List>
    </StyledDrawer>
  );
};

/**
 * Styled Mui `Drawer` which always reflects dark mode coloration.
 */
const StyledDrawer = styled(Drawer)(({ theme: { variables } }) => {
  const appBarHeight = useAppBarHeight(variables);

  return {
    // The visible outer flex-col container:
    [`& > .${drawerClasses.paper}`]: {
      height: "100vh",
      width: homePageLayoutSharedStyles.desktopNavDrawerWidth,
      overflowY: "clip",
      backgroundColor: THEMES.DARK.palette.background.paper,
      borderRightColor: THEMES.DARK.palette.divider,
      borderRadius: 0,

      // ALL hr DIVIDERS
      [`& hr.${dividerClasses.root}`]: {
        borderColor: THEMES.DARK.palette.divider,
      },

      // TitleLogo styles:
      [`& > .${brandingClassNames.titleLogoRoot}`]: {
        height: `calc( ${appBarHeight} - 1px )`,
        padding: "0 0.5rem 0 1.2rem",
        justifyContent: "flex-start",
        width: "min-content",
        [`& .${brandingClassNames.titleLogoText}`]: {
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
  };
});
