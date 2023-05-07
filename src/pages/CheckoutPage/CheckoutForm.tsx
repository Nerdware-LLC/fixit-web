import { checkoutValuesStore, type CheckoutValues } from "@cache/checkoutValuesStore";
import { StripeForm } from "@components/StripeForm";
import { useStripeService } from "@hooks/useStripeService";
import type { PaymentMethod } from "@stripe/stripe-js";

/**
 * Displays a form with a Stripe card input.
 */
export const CheckoutForm = ({
  onCompleteCheckout,
}: {
  onCompleteCheckout: (success: boolean) => Promise<void>;
}) => {
  const { selectedSubscription, promoCode } = checkoutValuesStore.useSubToStore() as CheckoutValues;
  const { submitPaymentForSubscription } = useStripeService();

  const handleSubmit = async (paymentMethod: PaymentMethod) => {
    const { success } = await submitPaymentForSubscription({
      selectedSubscription,
      paymentMethodID: paymentMethod.id,
      ...(!!promoCode && { promoCode }),
    });

    await onCompleteCheckout(success);
  };

  return (
    <StripeForm
      handleSubmit={handleSubmit}
      style={{
        padding: "1rem 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    />
  );
};
