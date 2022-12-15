import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { PageContainer } from "./PageContainer";

/**
 * Used by `LandingPage`, `RegisterPage`, and `LoginPage`.
 */
const LandingAndAuthPagesLayout = () => (
  <PageContainer>
    <StyledContentContainer>
      <Outlet />
    </StyledContentContainer>
  </PageContainer>
);

// Default export for lazy loading
export default LandingAndAuthPagesLayout;

const StyledContentContainer = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
