import { useState } from "react";
import { useStripeCardInput } from "./StripeCardInput";
import { StripeFormSubmitButton } from "./StripeFormSubmitButton";
import { useFetchStateContext } from "@components";
import { getTypeSafeErr } from "@utils";
import type { PaymentMethod } from "@stripe/stripe-js";

export const StripeFormChild = ({
  handleSubmit,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & {
  handleSubmit: (paymentMethod: PaymentMethod) => Promise<void>;
}) => {
  const { StripeCardInput, getPaymentMethod } = useStripeCardInput();
  const { setIsLoading, setError } = useFetchStateContext();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const _handleSubmit = (event: React.FormEvent) => {
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
    <form onSubmit={_handleSubmit} style={{ width: "100%" }} {...props}>
      <StripeCardInput setIsSubmitDisabled={setIsSubmitDisabled} />
      <StripeFormSubmitButton isSubmitDisabled={isSubmitDisabled} />
    </form>
  );
};
