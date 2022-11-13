import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import MuiAppBar from "@mui/material/AppBar";
import { LandingPageMenuBtns } from "./LandingPageMenuBtns";
import { AppBarUserAvatar } from "./AppBarUserAvatar";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { TitleLogo } from "../Branding";
import { isAuthenticatedStore } from "../../app";

export const AppBar = ({ position = "static" }: { position?: "static" | "fixed" }) => {
  const isUserAuthenticated = isAuthenticatedStore.useSubToStore();
  const nav = useNavigate();

  const goToLanding = () => nav("/");

  return (
    <MuiAppBar position={position}>
      <StyledAppBarContainer>
        <TitleLogo onClick={goToLanding} styles={styles.titleLogo} />
        <StyledAppBarButtonsContainer>
          {isUserAuthenticated !== true ? <LandingPageMenuBtns /> : <AppBarUserAvatar />}
          <DarkModeSwitch />
        </StyledAppBarButtonsContainer>
      </StyledAppBarContainer>
    </MuiAppBar>
  );
};

const StyledAppBarContainer = styled.div`
  height: 5.75vh;
  padding: 0 15.5vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledAppBarButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const styles = {
  titleLogo: {
    container: { height: "3rem" },
    logo: { height: "2.5rem" },
    title: { fontSize: "1.75rem", marginLeft: "0.5rem" }
  }
};
