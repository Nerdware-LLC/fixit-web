import { useNavigate } from "react-router-dom";
import MuiButton from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { LandingPageMenu } from "./LandingPageMenu";
import { PageHeaderContainer, PageHeaderLogoBtn } from "../common";

export const MobilePageHeader = () => {
  const { palette } = useTheme();
  const nav = useNavigate();

  const goToRegister = () => nav("/register");

  return (
    <PageHeaderContainer style={{ ...styles.pageHeaderContainer, borderColor: palette.divider }}>
      <MuiButton onClick={goToRegister} variant="outlined" color="primary">
        Sign Up
      </MuiButton>
      <PageHeaderLogoBtn style={{ marginRight: "3rem" }} />
      <LandingPageMenu />
    </PageHeaderContainer>
  );
};

const styles = {
  pageHeaderContainer: {
    padding: "2.5rem 2rem",
    borderStyle: "solid",
    borderWidth: "0 0 1px 0"
  }
};
