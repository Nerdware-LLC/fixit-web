import { useState } from "react";
import { isString } from "@nerdware/ts-type-safety-utils";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { inputBaseClasses } from "@mui/material/InputBase";
import TextField, { textFieldClasses } from "@mui/material/TextField";
import Text from "@mui/material/Typography";
import CheckmarkIcon from "@mui/icons-material/CheckCircle";
import { stripeService } from "@/services/stripeService.js";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore.js";
import { checkoutPageClassNames } from "./classNames.js";

export const PromoCodeInput = () => {
  // checkoutValuesStore: only updated upon valid promoCode entry
  const { promoCode, selectedSubscription, discountPercentage } =
    checkoutValuesStore.useSubToStore();

  // TextField state: local value/touched/error/success
  const [fieldState, setFieldState] = useState<PromoCodeInputState>({
    value: promoCode ?? "",
    touched: !!promoCode,
    success: !!promoCode && !!discountPercentage,
    error: false,
  });

  const handleFocus = () => {
    // If the input has not been successfully completed, reset the fieldState onFocus
    if (!promoCode && !discountPercentage) {
      setFieldState((prevFieldState) => ({
        ...prevFieldState,
        touched: true,
        error: false,
        value: "",
      }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldState({
      value: event.target.value,
      touched: true,
      error: false,
      success: false,
    });
  };

  const handleBlur = async () => {
    // If fieldState.value is undefined/empty, do nothing
    if (isString(fieldState.value) && fieldState.value.length > 0) {
      // If a value is present, check its validity
      const {
        promoCodeInfo: { isValidPromoCode, value: sanitizedPromoCodeValue, discountPercentage },
      } = await stripeService.checkPromoCode(fieldState.value);

      if (isValidPromoCode) {
        // IF VALID, update checkoutValuesStore
        setFieldState({ ...fieldState, success: true, error: false });
        checkoutValuesStore.set({
          selectedSubscription,
          promoCode: sanitizedPromoCodeValue,
          discountPercentage,
        });
      } else {
        // IF NOT VALID, show "error" elements/styling
        setFieldState({ ...fieldState, value: "", error: true });
      }
    }
  };

  return (
    <StyledDiv className={checkoutPageClassNames.priceInfoRow}>
      {promoCode && discountPercentage ? (
        <>
          <CheckmarkIcon color="success" sx={{ fontSize: "2rem" }} />
          <Text>Promo code applied</Text>
          <Chip label={`${discountPercentage}% off`} color="success" size="small" />
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
          disabled={selectedSubscription === "TRIAL"}
        />
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(({ theme: { palette } }) => ({
  // Set constant height so the layout doesn't shift when the promoCode is entered:
  height: "5.5rem",
  gap: "0.5rem !important",

  // Note: the Mui Chip is styled in SubCostDetails

  [`& > .${textFieldClasses.root}`]: {
    width: "100%",
    backgroundColor: palette.background.paper,

    [`& > .${inputBaseClasses.root}`]: {
      width: "100%",
    },
  },
}));

type PromoCodeInputState = {
  value: string;
  touched: boolean;
  error: boolean;
  success: boolean;
};
