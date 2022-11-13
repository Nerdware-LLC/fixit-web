import styled from "@emotion/styled";
import CheckmarkIcon from "@mui/icons-material/CheckCircle";

export const ProductFeaturesList = () => (
  <StyledFeaturesListContainer>
    <StyledRow>This includes:</StyledRow>
    <StyledRow>
      <StyledCheckmarkIcon /> Unlimited Work Orders
    </StyledRow>
    <StyledRow>
      <StyledCheckmarkIcon /> Unlimited Invoices
    </StyledRow>
    <StyledRow>
      <StyledCheckmarkIcon /> Send & Receive Payments
    </StyledRow>
  </StyledFeaturesListContainer>
);

const StyledFeaturesListContainer = styled.div`
  padding-bottom: 1rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: flex-start;
  flex-grow: 1;
`;

const StyledRow = styled.div`
  padding: 0.2rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledCheckmarkIcon = styled(CheckmarkIcon)`
  margin-right: 0.5rem;
`;
