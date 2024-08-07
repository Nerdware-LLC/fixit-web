import { useState } from "react";
import { getTypeSafeError } from "@nerdware/ts-type-safety-utils";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { styled } from "@mui/material/styles";
import { useFetchStateContext } from "@/app/FetchStateContext";
import { StripeFormSubmitButton } from "./StripeFormSubmitButton.jsx";
import { StripePaymentInput } from "./StripePaymentInput";
import type { CombineUnionOfObjects } from "@/types/helpers.js";
import type { StripeElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import type { Simplify, Except } from "type-fest";

/**
 * This component contains a `<form>` with the Stripe input elements which are
 * dependent upon the Stripe Elements context.
 */
export const StripeFormContent = ({ onSuccessfulSubmit, ...formProps }: StripeFormContentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { isLoading, fetchWithState } = useFetchStateContext();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const { handleSubmit: handleSubmitStripeInput } = StripePaymentInput.use();

  const handleInputChange = (
    event: CombineUnionOfObjects<StripeElementChangeEvent | StripePaymentElementChangeEvent>
  ) => {
    if (event.error) setIsSubmitDisabled(true);
  };

  const handleInputBlur = () => {
    if (!elements) return;
    elements
      .submit()
      .then(({ error }) => setIsSubmitDisabled(!!error))
      .catch(() => setIsSubmitDisabled(true));
  };

  // Form submission handler
  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    await fetchWithState(async () => {
      // This try block merely sets a fallback error message
      try {
        await handleSubmitStripeInput(stripe, elements);
        if (onSuccessfulSubmit) await onSuccessfulSubmit();
      } catch (err) {
        throw getTypeSafeError(err, {
          fallBackErrMsg: "Failed to process payment — please try again later.",
        });
      }
    });
  };

  return (
    <StyledForm onSubmit={handleSubmitForm} tabIndex={0} {...formProps}>
      <StripePaymentInput onChange={handleInputChange} onBlur={handleInputBlur} />
      <StripeFormSubmitButton
        disabled={!stripe || !elements || isLoading || isSubmitDisabled}
        isLoading={isLoading}
      />
    </StyledForm>
  );
};

const StyledForm = styled("form")({
  display: "inline-flex",
  flexDirection: "column",
  gap: "1rem",
});

export type StripeFormContentProps = Simplify<
  Except<React.ComponentProps<typeof StyledForm>, "onSubmit" | "children"> & {
    onSuccessfulSubmit?: () => Promise<void>;
  }
>;
