import { styled } from "@mui/material/styles";
import CheckmarkIcon from "@mui/icons-material/CheckCircle";

export const ProductFeatures = () => (
  <StyledDiv>
    <div>This includes:</div>
    <div>
      <CheckmarkIcon />
      <span>Unlimited Work Orders</span>
    </div>
    <div>
      <CheckmarkIcon />
      <span>Unlimited Invoices</span>
    </div>
    <div>
      <CheckmarkIcon />
      <span>Send & Receive Payments</span>
    </div>
  </StyledDiv>
);

const StyledDiv = styled("div")({
  width: "100%",

  "& > div": {
    width: "100%",
    padding: "0.25rem 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    "& > span": {
      width: "100%",
      marginLeft: "0.5rem",
      display: "inline-block",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },
});
