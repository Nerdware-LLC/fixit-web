import { useFetchStateContext } from "@/app/FetchStateContext";
import { ErrorDialog } from "@/components/Indicators";
import { StripeForm, type StripeFormProps } from "@/components/StripeForm";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore";
import { SUB_PRICING_DISPLAY_CONFIGS, getPrice_FOR_DISPLAY_ONLY } from "./helpers";

/**
 * Displays a form with a Stripe PaymentInput.
 */
export const CheckoutForm = ({
  onSuccessfulSubmit: parentOnSuccessfulSubmitHandler,
}: CheckoutFormProps) => {
  // Route protection guarantees that selectedSubscription is defined, hence the as cast
  const { selectedSubscription, discountPercentage } = checkoutValuesStore.useSubToStore<true>();

  const { error, clearError } = useFetchStateContext();

  const amountDueToday = getPrice_FOR_DISPLAY_ONLY(
    SUB_PRICING_DISPLAY_CONFIGS[selectedSubscription].price,
    discountPercentage
  );

  const handleSuccessfulSubmit: StripeFormProps["onSuccessfulSubmit"] = async () => {
    if (parentOnSuccessfulSubmitHandler) {
      await parentOnSuccessfulSubmitHandler();
    }
  };

  return (
    <>
      <StripeForm
        onSuccessfulSubmit={handleSuccessfulSubmit}
        stripeElementsOptions={{
          mode: "subscription",
          currency: "usd",
          amount: amountDueToday,
        }}
      />
      {error && (
        <ErrorDialog
          title="There was an issue with your payment"
          error={error}
          onDismiss={clearError}
        />
      )}
    </>
  );
};

export type CheckoutFormProps = Pick<StripeFormProps, "onSuccessfulSubmit">;
