import { useState, useEffect } from "react";
import { useElements, CardElement } from "@stripe/react-stripe-js";
import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { useFetchStateContext } from "@components/Indicators/useFetchStateContext";
import { useStripeCardInput } from "./useStripeCardInput";
import { stripeFormClassNames as classNames } from "../classNames";
import type { StripeCardElementChangeEvent } from "@stripe/stripe-js";

export const StripeCardInput = ({ setIsSubmitDisabled }: StripeCardInputProps) => {
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);
  const { error: fetchError } = useFetchStateContext();

  useEffect(() => {
    if (fetchError && elements) {
      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        cardElement.clear();
      }
    }
  }, [elements, fetchError]);

  const handleChange = (event: StripeCardElementChangeEvent) => {
    if (event.error) {
      setIsSubmitDisabled(true);
      setCardError(event.error.message);
    } else {
      setCardError(null);
      if (event.complete) setIsSubmitDisabled(false);
    }
  };

  return (
    <StyledDiv className={classNames.cardInput.container} hasError={!!cardError}>
      <label htmlFor={stripeCardInputElementIDs.cardInput} className={classNames.cardInput.label}>
        Credit or Debit Card
      </label>
      <CardElement
        id={stripeCardInputElementIDs.cardInput}
        onChange={handleChange}
        options={{
          style: {
            base: { fontSmoothing: "antialiased" },
            invalid: { iconColor: "#fa755a" },
          },
        }}
      />
      <div className={classNames.cardInput.errorMessage.container}>
        <Text className={classNames.cardInput.errorMessage.text}>{cardError ?? ""}</Text>
      </div>
    </StyledDiv>
  );
};

StripeCardInput.use = useStripeCardInput;

export const stripeCardInputElementIDs = {
  cardInput: "stripe-card-element",
};

const StyledDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError: boolean }>(({ theme, hasError }) => ({
  boxSizing: "border-box",
  marginBottom: "1rem",
  display: "flex",
  flexDirection: "column",

  // LABEL

  [`& > .${classNames.cardInput.label}`]: {
    fontSize: "1rem",
    lineHeight: "1.25rem",
    color: theme.palette.primary.main,
  },

  // STRIPE CARD ELEMENT

  [`& > #${stripeCardInputElementIDs.cardInput}`]: {
    boxSizing: "border-box",
    height: "40px",
    padding: "10px 12px",
    width: "100%",
    color: "#32325d",
    fontSize: "16px",
    WebkitFontSmoothing: "antialiased",
    backgroundColor: "white",
    border: "1px solid transparent",
    borderRadius: "4px",
    boxShadow: "0 1px 3px 0 #e6ebf1",
    WebkitTransition: "box-shadow 150ms ease",
    transition: "box-shadow 150ms ease",
    "&::placeholder": {
      color: "#aab7c4",
    },
    "&.StripeElement--focus": {
      boxShadow: "0 1px 3px 0 #cfd7df",
    },
    "&.StripeElement--invalid": {
      color: "#fa755a",
      borderColor: "#fa755a",
    },
    "&.StripeElement--webkit-autofill": {
      backgroundColor: "#fefde5 !important",
    },
  },

  // ERROR MESSAGE

  [`& > .${classNames.cardInput.errorMessage.container}`]: {
    visibility: hasError ? "visible" : "hidden",
    boxSizing: "border-box",
    height: "1.5rem",
    padding: "0.25rem 0",
    whiteSpace: "nowrap",

    [`& > .${classNames.cardInput.errorMessage.text}`]: {
      color: theme.palette.error.main,
      position: "relative",
      animationDuration: "1s",
      animationName: "slide-down",
      "@keyframes slide-down": {
        from: {
          top: "-1rem",
          opacity: 0,
        },
        to: {
          top: 0,
          opacity: 1,
        },
      },
    },
  },
}));

export type StripeCardInputProps = {
  setIsSubmitDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};
