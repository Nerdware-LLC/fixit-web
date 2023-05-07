import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useFetchStateContext } from "@components/Indicators/useFetchStateContext";
import { getTypeSafeErr } from "@utils/typeSafety";
import { StripeCardInput } from "./StripeCardInput";
import { StripeFormSubmitButton } from "./StripeFormSubmitButton";
import { stripeFormClassNames as classNames } from "./classNames";
import type { PaymentMethod } from "@stripe/stripe-js";

/**
 * This component contains the Stripe comps which are dependent upon the Stripe
 * Elements context.
 */
export const StripeFormElements = ({ handleSubmit, ...props }: StripeFormElementsProps) => {
  const { getPaymentMethod } = StripeCardInput.use();
  const { setIsLoading, setError } = useFetchStateContext();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const handleSubmitAndFetchStateContext = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setIsSubmitDisabled(true);
    (async () => {
      try {
        const paymentMethod = await getPaymentMethod();
        if (!paymentMethod) {
          setError("Invalid payment method");
        } else {
          await handleSubmit(paymentMethod);
        }
      } catch (error) {
        setError(
          getTypeSafeErr(error, "Failed to process payment - please try again later.").message
        );
        setIsSubmitDisabled(true);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <StyledForm
      onSubmit={handleSubmitAndFetchStateContext}
      className={classNames.stripeFormRoot}
      {...props}
    >
      <StripeCardInput setIsSubmitDisabled={setIsSubmitDisabled} />
      <StripeFormSubmitButton isSubmitDisabled={isSubmitDisabled} />
    </StyledForm>
  );
};

const StyledForm = styled("form")({
  width: "100%",

  [`& > .${classNames.submitButton}`]: {
    lineHeight: "1.75rem",
    display: "flex",
    justifySelf: "flex-end",
  },
});

export type StripeFormElementsProps = React.ComponentProps<typeof StyledForm> & {
  handleSubmit: (paymentMethod: PaymentMethod) => Promise<void>;
};
