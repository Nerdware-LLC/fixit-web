import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AppBar, APP_BAR_HEIGHT } from "./AppBar";

/**
 * Responsive page-layout container with mobile/desktop AppBar.
 */
export const PageContainer = () => (
  <StyledPageContainer className="page-container">
    <AppBar />
    <div className="page-content-container">
      <Outlet />
    </div>
  </StyledPageContainer>
);

const StyledPageContainer = styled("div")(({ theme }) => {
  const appBarHeight = theme.variables.isMobilePageLayout
    ? APP_BAR_HEIGHT.MOBILE
    : APP_BAR_HEIGHT.DESKTOP;

  const contentContainerHeight = `calc(100dvh - ${appBarHeight})`;

  return {
    height: "100dvh",
    maxHeight: "100dvh", // <-- ensures scrollbar never moves AppBar to the left
    width: "100dvw",
    maxWidth: "100dvw",
    display: "block",
    overflowX: "hidden",
    overflowY: "hidden",
    zIndex: 1,
    backgroundColor: theme.palette.background.default,

    /* AppBar
    AppBar consists of two menu "variants", Mobile and Desktop, the conditional rendering
    of which is determined by the PageLayoutContext value, isMobilePageLayout, which has
    been made available on the custom theme property "variables". Here this value is used
    to determine properties like height and width. Why not just use media queries for this?
    Because aside from factoring in viewport dimensions, isMobilePageLayout also factors in
    the user's browser as determined by `navigator.userAgent` */

    /* Page Content Container
    To ensure child pages/layouts can set `height: 100%` and still get the desired scrolling
    behavior, this div wraps children with `max-height: 100dvh` minus the AppBar height, and
    `overflow-y: auto`. Scrolling can be disabled with `overflow-y: hidden` in child divs */
    "& > div.page-content-container": {
      height: contentContainerHeight,
      maxHeight: contentContainerHeight,
      overflowY: "auto"
    }
  };
});
