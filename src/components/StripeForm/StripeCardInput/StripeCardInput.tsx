import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { useElements, CardElement } from "@stripe/react-stripe-js";
import { useFetchStateContext } from "../../Indicators";
import { ErrorMessage } from "../../Typography";
import { func } from "../../../types";
import type { StripeCardElementChangeEvent } from "@stripe/stripe-js";

export const StripeCardInput = ({ setIsSubmitDisabled }: { setIsSubmitDisabled: Function }) => {
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);
  const { error: fetchError } = useFetchStateContext();
  const { palette } = useTheme();

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
    <CardInputContainer>
      <StyledLabel htmlFor={"card-element"} style={{ color: palette.primary.main }}>
        Credit or Debit Card
      </StyledLabel>
      <StyledCardElement
        id={"card-element"}
        options={CARD_ELEMENT_OPTIONS}
        onChange={handleChange}
      />
      <ErrorMessage error={cardError} />
    </CardInputContainer>
  );
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSmoothing: "antialiased"
    },
    invalid: {
      iconColor: "#fa755a"
    }
  }
};

const StyledCardElement = styled(CardElement)`
  box-sizing: border-box;
  height: 40px;
  padding: 10px 12px;
  width: 100%;
  color: #32325d;
  font-size: 16px;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;

  &::placeholder {
    color: #aab7c4;
  }

  &.StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  &.StripeElement--invalid {
    color: #fa755a;
    border-color: #fa755a;
  }

  &.StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  line-height: 1.25rem;
`;

const CardInputContainer = styled.div`
  box-sizing: border-box;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

StripeCardInput.propTypes = {
  setIsSubmitDisabled: func.isRequired
};
