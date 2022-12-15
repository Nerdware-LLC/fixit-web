import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { usePageLayoutContext } from "@components/PageLayoutContext";
import { DesktopLayoutAppBar } from "./DesktopLayout";
import { MobilePageHeader } from "./MobileLayout";

// TODO Move this to src/layouts/

/**
 * Responsive page-layout container component which changes layouts
 * based on the window dimensions.
 */
export const PageContainer = ({
  style = {},
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return (
    <StyledPageContainer isMobilePageLayout={isMobilePageLayout} style={style} {...props}>
      {isMobilePageLayout ? <MobilePageHeader /> : <DesktopLayoutAppBar />}
      {children ?? <Outlet />}
    </StyledPageContainer>
  );
};

const StyledPageContainer = styled("div")<{ isMobilePageLayout: boolean }>(
  ({ theme, isMobilePageLayout }) => ({
    width: "100vw",
    maxWidth: "100vw",
    overflowX: "hidden",
    zIndex: 1,
    backgroundColor: theme.palette.background.default,
    ...(isMobilePageLayout
      ? {
          display: "flex",
          flexDirection: "column",
          height: "auto",
          overflowY: "auto"
        }
      : {
          display: "block",
          height: "100vh",
          overflowY: "hidden",
          paddingTop: "6vh" // <-- the height of PageHeaderContainer
        })
  })
);
