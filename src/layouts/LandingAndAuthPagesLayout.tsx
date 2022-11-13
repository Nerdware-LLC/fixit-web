import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { PageContainer, AppBar } from "../components";

/**
 * Used by `LandingPage`, `RegisterPage`, and `LoginPage`.
 */
const LandingAndAuthPagesLayout = () => (
  <PageContainer style={{ height: "100vh", overflowY: "hidden" }}>
    <AppBar />
    <StyledContentContainer>
      <Outlet />
    </StyledContentContainer>
  </PageContainer>
);

// Default export for lazy loading
export default LandingAndAuthPagesLayout;

const StyledContentContainer = styled.div`
  padding: 12vh 30vw;
  display: flex;
  flex-grow: 1;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;
