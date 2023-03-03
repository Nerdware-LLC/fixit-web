import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { usePageLayoutContext } from "@app/PageLayoutContext";
import { HomePageNavDesktop, DRAWER_WIDTH } from "./HomePageNavDesktop";
import { HomePageNavMobile, NAV_BAR_SIZE } from "./HomePageNavMobile";

export const HomePageLayout = () => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return (
    <StyledHomePageLayoutContainer id="home-page-layout-container">
      <Outlet />
      {isMobilePageLayout ? <HomePageNavMobile /> : <HomePageNavDesktop />}
    </StyledHomePageLayoutContainer>
  );
};

const StyledHomePageLayoutContainer = styled("div")(({ theme }) => ({
  ...(theme.variables.isMobilePageLayout
    ? {
        height: `calc(100% - ${NAV_BAR_SIZE.height})`,
        width: "100%"
      }
    : {
        height: "100%",
        width: `calc(100% - ${DRAWER_WIDTH})`,
        marginLeft: "auto"
      }),
  maxWidth: "100vw",
  overflow: "hidden",

  // If a screen is somehow under 300px, allow x-scroll
  "@media (max-width: 300px)": {
    overflowX: "scroll"
  }
}));
