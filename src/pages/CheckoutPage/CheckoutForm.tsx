import { useFetchStateContext } from "@/app/FetchStateContext";
import { ErrorDialog } from "@/components/Indicators";
import { StripeForm, type StripeFormProps } from "@/components/StripeForm";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore.js";
import { SUB_PRICING_DISPLAY_CONFIGS } from "@/types/UserSubscription.js";
import { calculateDiscountedPrice_FOR_DISPLAY_ONLY } from "@/utils/numeric/calculate.js";

export type CheckoutFormProps = Pick<StripeFormProps, "onSuccessfulSubmit">;

/**
 * Displays a form with a Stripe PaymentInput.
 */
export const CheckoutForm = ({
  onSuccessfulSubmit: parentOnSuccessfulSubmitHandler,
}: CheckoutFormProps) => {
  // Route protection guarantees that selectedSubscription is defined, hence the as cast
  const { selectedSubscription, discountPercentage } = checkoutValuesStore.useSubToStore();

  const { error, clearError } = useFetchStateContext();

  const amountDueToday = calculateDiscountedPrice_FOR_DISPLAY_ONLY(
    SUB_PRICING_DISPLAY_CONFIGS[selectedSubscription!].price,
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
