import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Text from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ReceiptShapedContainer } from "@/components/Containers/ReceiptShapedContainer";
import { APP_PATHS } from "@/routes/appPaths";
import { checkoutValuesStore } from "@/stores";
import { SUB_PRICING_DISPLAY_CONFIGS, getPrice_FOR_DISPLAY_ONLY } from "./helpers";

export const PaymentConfirmationInfo = () => {
  // Route protection guarantees that these values are defined, hence the as cast
  const { selectedSubscription, discountPercentage } = checkoutValuesStore.useSubToStore<true>();
  const nav = useNavigate();

  // Nav to /home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => nav(APP_PATHS.HOME), 5000);
    // Before unmounting, clear the timeout
    return () => clearTimeout(timer);
  }, [nav]);

  const paymentAmountStr = getPrice_FOR_DISPLAY_ONLY(
    SUB_PRICING_DISPLAY_CONFIGS[selectedSubscription].price,
    discountPercentage,
    { formatAsCurrency: true }
  );

  return (
    <Box
      sx={({ variables }) => ({
        ...(!variables.isMobilePageLayout && {
          height: "100%",
          padding: "15% 0",
        }),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "space-between",
        gap: "2rem",
      })}
    >
      <CheckCircleOutlineIcon color="success" style={{ fontSize: "8rem" }} />
      <Text variant="h4">Thanks for using Fixit</Text>
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
      <Stack flexDirection="row">
        <Text style={{ marginRight: "0.75rem" }}>You will be redirected momentarily</Text>
        <CircularProgress color="secondary" size="1.5rem" />
      </Stack>
    </Box>
  );
};
