import { useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { inputBaseClasses } from "@mui/material/InputBase";
import TextField, { textFieldClasses } from "@mui/material/TextField";
import Text from "@mui/material/Typography";
import CheckmarkIcon from "@mui/icons-material/CheckCircle";
import { checkoutValuesStore } from "@cache/checkoutValuesStore";
import { checkoutPageClassNames } from "./classNames";
import { PROMO_CODES } from "./promoCodes";

export const PromoCodeInput = () => {
  // checkoutValuesStore: only updated upon valid promoCode entry
  const { promoCode, selectedSubscription } = checkoutValuesStore.useSubToStore();
  // TextField state: local value/touched/error/success
  const [fieldState, setFieldState] = useState<PromoCodeInputState>({
    value: promoCode ?? "",
    touched: false,
    error: false,
    success: false,
  });

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFieldState({
      ...fieldState,
      touched: true,
      error: false,
      value: "",
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldState({
      value: event.target.value,
      touched: true,
      error: false,
      success: false,
    });
  };

  const handleBlur = () => {
    // If fieldState.value is undefined/empty, do nothing
    if (typeof fieldState.value === "string" && fieldState.value.length > 0) {
      // If a value is present, check its validity
      if (fieldState.value in PROMO_CODES) {
        // IF VALID, update checkoutValuesStore
        setFieldState({ ...fieldState, success: true });
        checkoutValuesStore.set({
          selectedSubscription,
          promoCode: fieldState.value,
        });
      } else {
        // IF NOT VALID, show "error" elements/styling
        setFieldState({ ...fieldState, value: "", error: true });
      }
    }
  };

  return (
    <StyledDiv className={checkoutPageClassNames.subCostDetails.priceInfoRow}>
      {typeof promoCode === "string" && promoCode in PROMO_CODES ? (
        <>
          <div>
            <CheckmarkIcon color="success" />
            <Text className={checkoutPageClassNames.baseText}>Promo code applied</Text>
          </div>
          <Chip label={`${PROMO_CODES[promoCode]}% off`} color="success" size="small" />
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
        />
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(({ theme }) => ({
  // This div is shown if a valid promoCode has been provided
  "& > div:first-of-type": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    "& svg": {
      marginRight: "0.5rem",
    },
  },

  // Note: the Mui Chip is styled in SubCostDetails

  [`& > .${textFieldClasses.root}`]: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    [`& > .${inputBaseClasses.root}`]: {
      width: "100%",
    },
  },
}));

interface PromoCodeInputState {
  value: string;
  touched: boolean;
  error: boolean;
  success: boolean;
}
