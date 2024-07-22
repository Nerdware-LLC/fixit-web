import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Text from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ReceiptShapedContainer } from "@/components/Containers/ReceiptShapedContainer.jsx";
import { APP_PATHS } from "@/routes/appPaths.js";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore.js";
import { SUB_PRICING_DISPLAY_CONFIGS } from "@/types/UserSubscription.js";
import { getPrice_FOR_DISPLAY_ONLY } from "@/utils/formatters/currency.js";

export const PaymentConfirmationInfo = () => {
  // Route protection guarantees that these values are defined, hence the as cast
  const { selectedSubscription, discountPercentage } = checkoutValuesStore.useSubToStore();
  const nav = useNavigate();

  // Nav to /home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => nav(APP_PATHS.HOME), 5000);
    // Before unmounting, clear the timeout
    return () => clearTimeout(timer);
  }, [nav]);

  const paymentAmountStr = getPrice_FOR_DISPLAY_ONLY(
    SUB_PRICING_DISPLAY_CONFIGS[selectedSubscription!].price,
    discountPercentage
  );

  return (
    <Box
      sx={({ variables }) => ({
        ...(!variables.isMobilePageLayout && { height: "100%" }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "inherit",
        "& *": {
          textWrap: "balance",
        },
      })}
    >
      <CheckCircleOutlineIcon
        color="success"
        style={{
          fontSize: "8rem",
          margin: "-0.5rem 0",
          // -margin corrects vert-spacing issue caused by <path> not taking up all of the <svg> viewbox
        }}
      />
      <Text variant="h4">Thanks for using Fixit!</Text>
      <Text>
        {selectedSubscription === "TRIAL"
          ? "After your trial, a payment to Stripe will appear on your statement."
          : "A payment to Stripe will appear on your statement."}
      </Text>
      <ReceiptShapedContainer
        receiptEntries={[{ label: "STRIPE", value: paymentAmountStr }]}
        style={{ width: "70%" }}
      />
      <Text>A copy of this confirmation has been sent to your account email.</Text>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Text>You will be redirected momentarily...</Text>
        <LinearProgress color="secondary" style={{ width: "66%" }} />
      </div>
    </Box>
  );
};
