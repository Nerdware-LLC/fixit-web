import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { usePageLayoutContext } from "@/app/PageLayoutContext";
import { ErrorDialog } from "@/components/Indicators";
import { DesktopNavDrawer } from "./DesktopNavDrawer.jsx";
import { MobileNavBar } from "./MobileNavBar.jsx";
import { homePageLayoutElementIDs } from "./elementIDs.js";
import { homePageLayoutSharedStyles } from "./styles.js";

/**
 * This layout-route component is rendered within `RootAppLayout` when the path is `"/home/*"`.
 *
 * - The home page is protected - only users which are both authenticated _and_ authorized
 *   can access the home page and its descendent routes/content.
 * - Descendent routes/content are rendered via `<Outlet />` (see `src/routes/RootAppRouter`).
 */
export const HomePageLayout = () => {
  const { isMobilePageLayout } = usePageLayoutContext();
  // Fetch-state indicators for certain actions, like the Stripe/Connect buttons:
  const { error, clearError } = useFetchStateContext();

  return (
    <StyledDiv id={homePageLayoutElementIDs.root}>
      <Outlet />
      {isMobilePageLayout ? <MobileNavBar /> : <DesktopNavDrawer />}
      {error && <ErrorDialog error={error} onClose={clearError} />}
    </StyledDiv>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = HomePageLayout;

const StyledDiv = styled("div")(({ theme: { variables, breakpoints } }) => ({
  // Ascertain view dimensions using isMobilePageLayout:
  ...(variables.isMobilePageLayout
    ? {
        // height ensures descendent views are full-height:
        height: `calc( 100% - ${homePageLayoutSharedStyles.mobileNavBarHeight} )`,
        // min-height, to allow the RootAppLayout's child/Outlet container to y-scroll
        minHeight: `calc( 100% - ${homePageLayoutSharedStyles.mobileNavBarHeight} )`,
        width: "100%",
      }
    : {
        height: "100%",
        width: `calc( 100% - ${homePageLayoutSharedStyles.desktopNavDrawerWidth} )`,
        marginLeft: "auto",
      }),
  maxWidth: "100vw",
  overflow: "hidden",

  // If a screen is somehow under 300px, allow x-scroll
  [breakpoints.down(300)]: {
    overflowX: "scroll",
  },
}));
