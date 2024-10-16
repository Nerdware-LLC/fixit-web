import { useState } from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Text from "@mui/material/Typography";
import CheckmarkIcon from "@mui/icons-material/CheckCircle";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { stripeService } from "@/services/stripeService.js";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore.js";
import { checkoutPageClassNames } from "./classNames.js";

export const PromoCodeInput = () => {
  // checkoutValuesStore: only updated upon valid promoCode entry
  const { promoCode, selectedSubscription, discountPercentage } =
    checkoutValuesStore.useSubToStore();

  const checkoutFormFetchState = useFetchStateContext();

  // TextField state: local value/touched/error/success
  const [fieldState, setFieldState] = useState<PromoCodeInputState>({
    value: promoCode ?? "",
    touched: !!promoCode,
    focused: false,
    success: !!promoCode && !!discountPercentage,
    error: false,
  });

  // Ensure this component does not render anything if selectedSubscription is "TRIAL":
  if (selectedSubscription === "TRIAL") return null;

  const handleFocus = () => {
    // If the input has not been successfully completed, reset the fieldState onFocus
    if (!promoCode && !discountPercentage) {
      setFieldState((prevFieldState) => ({
        ...prevFieldState,
        touched: true,
        focused: true,
        error: false,
        value: "",
      }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldState({
      value: event.target.value,
      touched: true,
      focused: true,
      error: false,
      success: false,
    });
  };

  const handleBlur = async () => {
    // If fieldState.value is undefined/empty, only update the focused state
    if (!fieldState.value) {
      setFieldState({ ...fieldState, focused: false });
      return;
    }

    // If fieldState.value is truthy, check its validity and update state values
    const {
      promoCodeInfo: { isValidPromoCode, value: sanitizedPromoCodeValue, discountPercentage },
    } = await stripeService.checkPromoCode(fieldState.value);

    // IF VALID, update checkoutValuesStore
    if (isValidPromoCode) {
      setFieldState({ ...fieldState, focused: false, success: true, error: false });
      checkoutValuesStore.set({
        selectedSubscription,
        promoCode: sanitizedPromoCodeValue,
        discountPercentage: discountPercentage ?? null,
      });
    } else {
      // IF NOT VALID, show "error" elements/styling
      setFieldState({ ...fieldState, focused: false, value: "", error: true });
    }
  };

  const showSuccess = promoCode && discountPercentage;

  return (
    <div
      className={checkoutPageClassNames.priceInfoRow}
      style={{ height: "3.5rem" }} // Fixed height so the layout doesn't change upon success
    >
      {showSuccess ? (
        <>
          <CheckmarkIcon color="success" fontSize="large" />
          <Text style={{ marginRight: "auto" }}>Promo code applied!</Text>
          <Chip label={`${discountPercentage}% off`} />
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
          color={fieldState.success ? "success" : undefined}
          disabled={checkoutFormFetchState.isLoading || !!checkoutFormFetchState.error}
          sx={{
            width: "100%",
            backgroundColor: fieldState.focused ? "background.paper" : "divider",
          }}
        />
      )}
    </div>
  );
};

type PromoCodeInputState = {
  value: string;
  touched: boolean;
  focused: boolean;
  error: boolean;
  success: boolean;
};
