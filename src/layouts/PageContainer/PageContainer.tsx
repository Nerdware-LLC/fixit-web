import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AppBar } from "./AppBar";

/**
 * Responsive page-layout container with mobile/desktop AppBar.
 */
export const PageContainer = () => (
  <StyledPageContainer id={pageContainerElementIDs.root}>
    <AppBar />
    <div id={pageContainerElementIDs.rrdOutletContainer}>
      <Outlet />
    </div>
  </StyledPageContainer>
);

export const pageContainerElementIDs = {
  root: "page-container-root",
  rrdOutletContainer: "page-container-rrd-outlet-container",
};

const StyledPageContainer = styled("div")(({ theme }) => {
  const appBarHeight = theme.variables.isMobilePageLayout ? "5rem" : "3rem";
  const contentContainerHeight = `calc( 100% - ${appBarHeight} )`;

  return {
    "--app-bar-height": appBarHeight,

    height: "100%",
    maxHeight: "100dvh",
    width: "100%",
    maxWidth: "100dvw",
    overflow: "hidden",
    zIndex: 1,
    backgroundColor: theme.palette.background.default,

    [`& > #${pageContainerElementIDs.rrdOutletContainer}`]: {
      height: contentContainerHeight,
      minHeight: contentContainerHeight,
      maxHeight: contentContainerHeight,
      width: "100%",
      maxWidth: "100dvw",
      overflow: "hidden",
    },
  };
});
