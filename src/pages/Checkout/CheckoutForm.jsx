import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useCheckoutContext } from "./CheckoutContext";
import { StripeForm } from "../../components";
import { stripeService } from "../../services";

export const CheckoutForm = () => {
  // prettier-ignore
  const { selectedSubscription, promoCode, handlePostSubmit } = useCheckoutContext();

  const handleSubmit = async paymentMethod => {
    const { token } = await stripeService.submitPaymentForSubscription({
      selectedSubscription,
      promoCode,
      paymentMethod_id: paymentMethod.id
    });
    toast.success("Success! 👍 You will be redirected in just a moment.", {
      onClose: () => handlePostSubmit({ token })
    });
  };

  return <StripeCheckoutForm handleSubmit={handleSubmit} />;
};

const StripeCheckoutForm = styled(StripeForm)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
