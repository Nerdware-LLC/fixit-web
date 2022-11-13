import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { useCheckoutContext } from "./CheckoutContext";
import { StripeForm } from "../../components";
import { stripeService } from "../../services";
import type { PaymentMethod } from "@stripe/stripe-js";

export const CheckoutForm = () => {
  const { selectedSubscription, promoCode, handlePostSubmit } = useCheckoutContext();

  const handleSubmit = async (paymentMethod: PaymentMethod) => {
    const { token } = await stripeService.submitPaymentForSubscription({
      selectedSubscription,
      paymentMethodID: paymentMethod.id,
      ...(!!promoCode && { promoCode })
    });
    toast.success("Success! 👍 You will be redirected in just a moment.", {
      onClose: () => handlePostSubmit({ token })
    });
  };

  return <StripeCheckoutForm handleSubmit={handleSubmit} />;
};

const StripeCheckoutForm = styled(StripeForm)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
