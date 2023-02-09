import { styled } from "@mui/material/styles";
import CheckmarkIcon from "@mui/icons-material/CheckCircle";

export const ProductFeaturesList = () => (
  <div style={{ width: "100%" }}>
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
  </div>
);

const StyledRow = styled("div")`
  width: 100%;
  padding: 0.25rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledTextSpan = styled("span")`
  width: 100%;
  margin-left: 0.5rem;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
