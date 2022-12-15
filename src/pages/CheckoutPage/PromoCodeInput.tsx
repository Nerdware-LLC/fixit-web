import { useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import CheckmarkIcon from "@mui/icons-material/CheckCircle";
import { StyledText } from "./SubCostDetails";
import { checkoutValuesStore } from "@app";
import { ENV } from "@config";

export const PromoCodeInput = () => {
  const { palette } = useTheme();
  // checkoutValuesStore: only updated upon valid promoCode entry
  const { promoCode, selectedSubscription } = checkoutValuesStore.useSubToStore();
  // TextField state: local value/touched/error/success
  const [fieldState, setFieldState] = useState<PromoCodeInputState>({
    value: promoCode ?? "",
    touched: false,
    error: false,
    success: false
  });

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFieldState({
      ...fieldState,
      touched: true,
      error: false,
      value: ""
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldState({
      value: event.target.value,
      touched: true,
      error: false,
      success: false
    });
  };

  const handleBlur = () => {
    // If fieldState.value is undefined/empty, do nothing
    if (typeof fieldState.value === "string" && fieldState.value.length > 0) {
      // If a value is present, check its validity
      if (fieldState.value in ENV.STRIPE.PROMO_CODES) {
        // IF VALID, update checkoutValuesStore
        setFieldState({ ...fieldState, success: true });
        // NOTE: "success" styling only shown for a brief moment w this setup
        checkoutValuesStore.setCheckoutValues({
          selectedSubscription,
          promoCode: fieldState.value
        });
      } else {
        // IF NOT VALID, show "error" elements/styling
        setFieldState({ ...fieldState, value: "", error: true });
      }
    }
  };

  return typeof promoCode === "string" && promoCode in ENV.STRIPE.PROMO_CODES ? (
    <>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <CheckmarkIcon color="success" style={{ marginRight: "0.5rem" }} />
        <StyledText>Promo code applied</StyledText>
      </div>
      <Chip
        label={`${ENV.STRIPE.PROMO_CODES[promoCode]}% off`}
        color="success"
        size="small"
        sx={{ borderRadius: "3px", marginLeft: "1rem", fontWeight: "bold" }}
      />
    </>
  ) : (
    <TextField
      id="promoCode"
      label="Add Promo Code"
      value={fieldState.value}
      placeholder="PROMO CODE"
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      error={!!(fieldState.touched && fieldState.error)}
      helperText={fieldState.touched && fieldState.error ? "Invalid promo code" : null}
      autoCapitalize="characters"
      style={{
        width: "100%",
        backgroundColor: palette.background.paper,
        ...(fieldState.success && { color: palette.success.main })
      }}
    />
  );
};

interface PromoCodeInputState {
  value: string;
  touched: boolean;
  error: boolean;
  success: boolean;
}
