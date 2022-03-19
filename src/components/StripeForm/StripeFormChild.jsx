import React, { useState } from "react";
import styled from "styled-components";
import { useStripeCardInput } from "./StripeCardInput";
import { StripeFormSubmitButton } from "./StripeFormSubmitButton";
import { useFetchStateContext } from "../Indicators";
import { func, string } from "../../types";

export const StripeFormChild = ({ handleSubmit, ...otherProps }) => {
  const { StripeCardInput, getPaymentMethod } = useStripeCardInput();
  const { setIsLoading, setError } = useFetchStateContext();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const _handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitDisabled(true);
    (async () => {
      try {
        const paymentMethod = await getPaymentMethod();
        await handleSubmit(paymentMethod);
      } catch (error) {
        setError(error);
        setIsSubmitDisabled(true);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <StyledForm onSubmit={_handleSubmit} {...otherProps}>
      <StripeCardInput setIsSubmitDisabled={setIsSubmitDisabled} />
      <StripeFormSubmitButton isSubmitDisabled={isSubmitDisabled} />
    </StyledForm>
  );
};

const StyledForm = styled.form`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-self: flex-end;
`;

export const STRIPE_FORM_PROP_TYPES = {
  handleSubmit: func.isRequired,
  className: string
};

StripeFormChild.propTypes = STRIPE_FORM_PROP_TYPES;
