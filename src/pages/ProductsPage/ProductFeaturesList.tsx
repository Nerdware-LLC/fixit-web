import styled from "@emotion/styled";
import CheckmarkIcon from "@mui/icons-material/CheckCircle";

export const ProductFeaturesList = () => (
  <StyledFeaturesListContainer>
    <StyledRow>This includes:</StyledRow>
    <StyledRow>
      <CheckmarkIcon />
      <StyledTextSpan>Unlimited Work Orders</StyledTextSpan>
    </StyledRow>
    <StyledRow>
      <CheckmarkIcon />
      <StyledTextSpan>Unlimited Invoices</StyledTextSpan>
    </StyledRow>
    <StyledRow>
      <CheckmarkIcon />
      <StyledTextSpan>Send & Receive Payments</StyledTextSpan>
    </StyledRow>
  </StyledFeaturesListContainer>
);

const StyledFeaturesListContainer = styled.div`
  width: 100%;
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
  width: 100%;
  padding: 0.2rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTextSpan = styled.span`
  width: 100%;
  margin-left: 0.5rem;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
