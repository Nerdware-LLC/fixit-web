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

  const contentContainerHeight = `calc(100% - ${appBarHeight})`;

  return {
    height: "100%",
    maxHeight: "100dvh",
    width: "100%",
    maxWidth: "100dvw",
    overflow: "hidden",
    zIndex: 1,
    backgroundColor: theme.palette.background.default,

    "& > div.page-content-container": {
      height: contentContainerHeight,
      minHeight: contentContainerHeight,
      maxHeight: contentContainerHeight,
      width: "100%",
      maxWidth: "100dvw",
      overflow: "hidden"
    }
  };
});
