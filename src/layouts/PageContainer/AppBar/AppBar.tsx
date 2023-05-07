import { lazy } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { avatarClasses } from "@mui/material/Avatar";
import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import { AppBarLogoBtn } from "./AppBarLogoBtn";
import { DesktopAppBarMenu } from "./DesktopAppBarMenu";
import { MobileAppBarMenu } from "./MobileAppBarMenu";

const DevModeTools = lazy(() => import(/* webpackChunkName: "DevModeTools" */ "@/__tests__/DevModeTools")); // prettier-ignore

/**
 * Mui Material AppBar, with position "fixed".
 *
 * **Positioning:** To ensure components do not render behind AppBar, an offset is
 * used to take up the same height and width. This positioning solution and its
 * alternatives are described [here](https://mui.com/material-ui/react-app-bar/#fixed-placement).
 *
 * > Don't add `theme.mixins.toolbar` as recommended in the docs, it makes the
 *   Offset, and just sets min-height and breakpoints, but it breaks other styles.
 */
export const AppBar = () => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return (
    <>
      <StyledMuiAppBar id={appBarElementIDs.root} position="fixed" elevation={0}>
        <AppBarLogoBtn />
        {process.env.NODE_ENV === "development" && <DevModeTools style={{ marginLeft: "auto" }} />}
        {isMobilePageLayout ? <MobileAppBarMenu /> : <DesktopAppBarMenu />}
      </StyledMuiAppBar>
      <div id={appBarElementIDs.fixedPositionOffset} />
    </>
  );
};

export const appBarElementIDs = {
  root: "appbar-root",
  fixedPositionOffset: "appbar-fixed-position-offset",
};

const StyledMuiAppBar = styled(MuiAppBar)(({ theme }) => {
  // Get --app-bar-height from CSS variable set in PageContainer
  const appBarHeight = "var(--app-bar-height)";

  // These styles are all the same for both AppBar and its sibling offset (see jsdoc)
  const sharedStyles = {
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    /* AppBar has two variants, Mobile and Desktop, the conditional rendering of which
    is determined by the PageLayoutContext value, isMobilePageLayout, which has been
    made available on the custom theme property "variables". Here this value is used to
    determine properties like height and width. Why not just use media queries for this?
    Because aside from factoring in viewport dimensions, isMobilePageLayout also factors
    in the user's browser as determined by `navigator.userAgent`.  */
    ...(theme.variables.isMobilePageLayout
      ? {
          height: appBarHeight,
          minHeight: appBarHeight,
          maxHeight: appBarHeight,
          padding: "1.5rem",
          backgroundColor: "transparent",
        }
      : {
          height: appBarHeight,
          minHeight: appBarHeight,
          maxHeight: appBarHeight,
          padding: "1rem 2rem",
        }),
  };

  return {
    ...sharedStyles,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: theme.palette.divider,

    [`& .${avatarClasses.root}:hover`]: {
      cursor: "pointer",
    },

    // Apply sharedStyles to the sibling offset div
    [`& + #${appBarElementIDs.fixedPositionOffset}`]: {
      ...sharedStyles,
      borderColor: "transparent",
    },
  };
});
