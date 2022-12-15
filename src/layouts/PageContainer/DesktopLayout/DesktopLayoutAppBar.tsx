import styled from "@emotion/styled";
import MuiAppBar from "@mui/material/AppBar";
import { LandingPageMenuBtns } from "./LandingPageMenuBtns";
import { AppBarUserAvatar } from "./AppBarUserAvatar";
import { PageHeaderContainer, PageHeaderLogoBtn, DarkModeSwitch } from "../common";
import { isAuthenticatedStore } from "@app";

export const DesktopLayoutAppBar = ({ position = "fixed" }: { position?: "static" | "fixed" }) => {
  const isUserAuthenticated = isAuthenticatedStore.useSubToStore();

  return (
    <MuiAppBar position={position}>
      <PageHeaderContainer>
        <PageHeaderLogoBtn />{" "}
        {/* FIXME PageHeaderLogoBtn is not visible on home page/layout, Drawer is above it. */}
        <StyledAppBarButtonsContainer>
          {isUserAuthenticated !== true ? (
            <>
              <LandingPageMenuBtns />
              <DarkModeSwitch />
            </>
          ) : (
            <>
              <DarkModeSwitch />
              <AppBarUserAvatar />
            </>
          )}
        </StyledAppBarButtonsContainer>
      </PageHeaderContainer>
    </MuiAppBar>
  );
};

const StyledAppBarButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;
