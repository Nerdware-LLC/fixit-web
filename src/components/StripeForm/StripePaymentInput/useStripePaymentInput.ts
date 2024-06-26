import { stripeService } from "@/services/stripeService.js";
import { authenticatedUserStore } from "@/stores/authenticatedUserStore.js";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore.js";
import type { Stripe, StripeElements } from "@stripe/stripe-js";

/**
 * Relevant Stripe Docs
 *
 * - [Payment Element](https://stripe.com/docs/payments/payment-element)
 * - [Accept a subscription payment](https://stripe.com/docs/payments/accept-a-payment-deferred?platform=web&type=subscription)
 */
export const useStripePaymentInput = () => {
  // Route protection guarantees that selectedSubscription is defined, hence the as cast
  const { selectedSubscription, promoCode } = checkoutValuesStore.useSubToStore<true>();

  const handleSubmit = async (stripe: Stripe, elements: StripeElements) => {
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    if (submitError) throw submitError;

    // Gather available data for billing details
    const { email, phone } = authenticatedUserStore.get<true>();

    // Create the PaymentMethod using the details collected by the Payment Element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      elements,
      params: {
        billing_details: {
          email,
          ...(phone && { phone }),
        },
      },
    });

    // Check for possible errors
    if (error) throw error;
    if (!paymentMethod)
      throw new Error("Stripe Error: Failed to gather payment details — please try again.");

    const {
      checkoutCompletionInfo: { isCheckoutComplete, clientSecret },
    } = await stripeService.submitPaymentForSubscription({
      selectedSubscription,
      paymentMethodID: paymentMethod.id,
      ...(!!promoCode && { promoCode }),
    });

    // https://stripe.com/docs/payments/finalize-payments-on-the-server?platform=web&type=subscription#next-actions
    if (!isCheckoutComplete) {
      // Ensure a client secret was provided:
      if (!clientSecret)
        throw new Error("Stripe Error: We're unable to complete your payment at this time");

      const { error, paymentIntent } = await stripe.handleNextAction({ clientSecret });

      if (error) throw error;
      if (!paymentIntent || paymentIntent?.status !== "succeeded")
        throw new Error("Your payment could not be completed at this time");
    }
  };

  return { handleSubmit };
};
