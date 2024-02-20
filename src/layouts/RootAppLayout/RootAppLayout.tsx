import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { globalClassNames } from "@/app/GlobalStyles";
import { AppBar, useAppBarHeight } from "@/components/AppBar";
import { useAuthRefresh } from "@/hooks/useAuthRefresh";
import { rootAppLayoutElementIDs } from "./elementIDs";

/**
 * Responsive page-layout container with mobile/desktop `AppBar`.
 *
 * - As the name implies, this is the root container for all app components.
 * - This component is rendered by the app's `react-router-dom` router
 *   (see `src/routes/RootAppRouter`).
 * - Child components are rendered via `<Outlet />`.
 */
export const RootAppLayout = () => {
  useAuthRefresh();

  return (
    <StyledDiv id={rootAppLayoutElementIDs.root} className={globalClassNames.scrollbarForceHidden}>
      <AppBar />
      <div id={rootAppLayoutElementIDs.rrdOutletContainer}>
        <Outlet />
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(({ theme: { palette, variables } }) => {
  const appBarHeight = useAppBarHeight(variables);
  const contentContainerHeight = `calc( 100% - ${appBarHeight} )`;

  return {
    height: "100%",
    maxHeight: "100dvh",
    width: "100%",
    maxWidth: "100dvw",
    overflow: "hidden",
    zIndex: 1,
    backgroundColor: palette.background.default,

    [`& > #${rootAppLayoutElementIDs.rrdOutletContainer}`]: {
      height: contentContainerHeight,
      minHeight: contentContainerHeight,
      maxHeight: contentContainerHeight,
      width: "100%",
      maxWidth: "100dvw",
      overflowX: "hidden",
      overflowY: "auto",
    },
  };
});
