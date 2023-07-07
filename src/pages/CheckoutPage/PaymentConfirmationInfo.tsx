import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Text from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { checkoutValuesStore, type CheckoutValues } from "@cache/checkoutValuesStore";
import { SUB_DICT_DISPLAY_PARAMS, getTotal_DISPLAY_ONLY } from "./SubCostDetails";

export const PaymentConfirmationInfo = () => {
  const { selectedSubscription, promoCode } = checkoutValuesStore.useSubToStore() as CheckoutValues;
  const nav = useNavigate();

  // Nav to /home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => nav("/home"), 5000);
    // Before unmounting, clear the timeout
    return () => clearTimeout(timer);
  }, [nav]);

  const paymentAmountStr = getTotal_DISPLAY_ONLY(
    SUB_DICT_DISPLAY_PARAMS[selectedSubscription].price,
    promoCode
  );

  return (
    <Box
      sx={(theme) => ({
        ...(!theme.variables.isMobilePageLayout && {
          height: "100%",
          padding: "15% 0",
        }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "space-between",
      })}
    >
      <CheckCircleOutlineIcon color="success" style={{ fontSize: "8rem" }} />
      <h2 style={{ margin: "1rem 0" }}>Thanks for using Fixit</h2>
      <Text style={{ textAlign: "center", marginTop: "0.5rem" }}>
        {selectedSubscription === "TRIAL"
          ? "After your trial, a payment to Stripe will appear on your statement."
          : "A payment to Stripe will appear on your statement."}
      </Text>
      <ReceiptShapedContainer>
        <Text style={{ marginRight: "0.25rem" }}>STRIPE</Text>
        <LeadingDotsContainer>{".".repeat(100)}</LeadingDotsContainer>
        <Text style={{ marginLeft: "0.25rem" }}>{paymentAmountStr}</Text>
      </ReceiptShapedContainer>
      <Text>A copy of this confirmation has been sent to your account email.</Text>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ marginRight: "0.75rem" }}>You will be redirected momentarily</Text>
        <CircularProgress color="secondary" size="1.5rem" />
      </div>
    </Box>
  );
};

const ReceiptShapedContainer = styled("div")(({ theme: { palette } }) => ({
  height: "4rem",
  width: "70%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${palette.divider}`,
  borderBottomWidth: 0,
  borderRadius: "0.25rem 0.25rem 0 0",
  position: "relative",
  color: alpha(palette.text.primary, 0.75),

  "&::after": {
    background: `url( "${[
      "data:image/svg+xml,",
      "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' %3E",
      `%3Cpolyline points='0 45 25 30 50 45' style='fill:transparent%3Bstroke:${palette.divider}%3Bstroke-width:3' /%3E`,
      "%3C/svg%3E",
    ].join("")}" )`,
    backgroundPosition: "bottom",
    backgroundRepeat: "repeat-x",
    backgroundSize: "0.91rem",
    position: "absolute",
    content: "' '",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
}));

// Places leading dots before child text node in Mui Text element
const LeadingDotsContainer = styled("span")(({ theme }) => ({
  maxWidth: "65%",
  color: alpha(theme.palette.text.primary, 0.5),
  overflowX: "clip",
}));
