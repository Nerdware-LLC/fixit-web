import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { usePageLayoutContext } from "@app/PageLayoutContext";
import { AppBarLogoBtn } from "./AppBarLogoBtn";
import { MobileAppBarMenu } from "./MobileAppBarMenu";
import { DesktopAppBarMenu } from "./DesktopAppBarMenu";

/**
 * Mui Material AppBar, with position "fixed".
 *
 * - To ensure components do not render behind AppBar, an offset is used to take
 *   up the same height and width.
 *
 *   This positioning solution and its alternatives are described at the link below.
 *   https://mui.com/material-ui/react-app-bar/#fixed-placement
 *
 *   > Don't add `theme.mixins.toolbar` as recommended in the docs, it makes the
 *   Offset, and just sets min-height and breakpoints, but it .
 */
export const AppBar = () => {
  const { isMobilePageLayout } = usePageLayoutContext();

  // Menu is conditionally rendered to ensure DOM ref targets don't get messed up

  return (
    <>
      <StyledMuiAppBar id="appbar" position="fixed" elevation={0}>
        <AppBarLogoBtn />
        {isMobilePageLayout ? <MobileAppBarMenu /> : <DesktopAppBarMenu />}
      </StyledMuiAppBar>
      <div id="appbar-fixed-position-offset" />
    </>
  );
};

// Exported so PageContainer can use in css calc for content-area size
export const APP_BAR_HEIGHT = {
  MOBILE: "5rem",
  DESKTOP: "3rem"
};

const StyledMuiAppBar = styled(MuiAppBar)(({ theme }) => {
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
          height: APP_BAR_HEIGHT.MOBILE,
          minHeight: APP_BAR_HEIGHT.MOBILE,
          maxHeight: APP_BAR_HEIGHT.MOBILE,
          padding: "1.5rem",
          backgroundColor: "transparent"
        }
      : {
          height: APP_BAR_HEIGHT.DESKTOP,
          minHeight: APP_BAR_HEIGHT.DESKTOP,
          maxHeight: APP_BAR_HEIGHT.DESKTOP,
          padding: "1rem 2rem"
        })
  };

  return {
    ...sharedStyles,
    width: "100%",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    "& .MuiAvatar-root:hover": { cursor: "pointer" },

    // Apply sharedStyles to the sibling offset div
    "& + #appbar-fixed-position-offset": {
      ...sharedStyles,
      borderColor: "transparent"
    }
  };
});
