import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import moment from "moment";
import { checkoutValuesStore } from "@app";
import { StripeForm, useWebViewContext } from "@components";
import { useAuthToken } from "@hooks";
import { stripeService } from "@services";
import type { PaymentMethod } from "@stripe/stripe-js";

export const CheckoutForm = () => {
  const { selectedSubscription, promoCode } = checkoutValuesStore.useSubToStore();

  // For mobile WebView:
  const { isAppWithinWebView, webViewPostMessage } = useWebViewContext();
  // For non-mobile-WebView:
  const { processAuthToken } = useAuthToken();
  const nav = useNavigate();

  const handleSubmit = async (paymentMethod: PaymentMethod) => {
    const { token: updatedAuthToken } = await stripeService.submitPaymentForSubscription({
      selectedSubscription,
      paymentMethodID: paymentMethod.id,
      ...(!!promoCode && { promoCode })
    });

    // FIXME After successful payment, show a 'Confirmation' Page/Dialog instead of the toast msg.

    toast.success("Thanks for subscribing - welcome to Fixit", { toastId: "checkout-success" });

    if (isAppWithinWebView) {
      webViewPostMessage({ token: updatedAuthToken });
    } else {
      await processAuthToken(updatedAuthToken);
      checkoutValuesStore.clearStoredValues();
      nav("/home");
    }
  };

  // prettier-ignore
  const formSubmissionTermsText = selectedSubscription === "TRIAL"
    ? `After your trial ends, you will be charged $5.00 per month starting ${moment().add(14, "days").format("LL")}. You can always cancel before then.`
    : `By confirming your subscription, you allow Fixit to charge your card for this payment and future payments in accordance with their terms. You can always cancel your subscription.`;

  return (
    <div>
      <h2 style={{ margin: "1rem 0" }}>
        {selectedSubscription === "TRIAL" ? "Enter payment details" : "Pay with card"}
      </h2>
      <StripeCheckoutForm
        handleSubmit={handleSubmit}
        formSubmissionTermsText={formSubmissionTermsText}
      />
    </div>
  );
};

const StripeCheckoutForm = styled(StripeForm)`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
