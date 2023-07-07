import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import { HomePageNavDesktop } from "./HomePageNavDesktop";
import { HomePageNavMobile } from "./HomePageNavMobile";

export const HomePageLayout = () => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return (
    <StyledDiv id={homePageLayoutElementIDs.container}>
      <Outlet />
      {isMobilePageLayout ? <HomePageNavMobile /> : <HomePageNavDesktop />}
    </StyledDiv>
  );
};

export const homePageLayoutElementIDs = {
  container: "home-page-layout-container",
};

const StyledDiv = styled("div")(({ theme }) => {
  const mobileNavBarHeight = "3.5rem";
  const desktopNavDrawerWidth = "clamp(12.5rem, 20%, 14rem)";

  return {
    // Set the height/width CSS vars for mobile/desktop nav elements:
    "--mobile-nav-bar-height": mobileNavBarHeight,
    "--desktop-nav-drawer-width": desktopNavDrawerWidth,

    // Ascertain view dimensions using isMobilePageLayout:
    ...(theme.variables.isMobilePageLayout
      ? {
          height: `calc( 100% - ${mobileNavBarHeight} )`,
          width: "100%",
        }
      : {
          height: "100%",
          width: `calc( 100% - ${desktopNavDrawerWidth} )`,
          marginLeft: "auto",
        }),
    maxWidth: "100vw",
    overflow: "hidden",

    // If a screen is somehow under 300px, allow x-scroll
    "@media (max-width: 300px)": {
      overflowX: "scroll",
    },
  };
});
