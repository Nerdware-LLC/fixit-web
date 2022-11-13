import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { StripeCardInput } from "./StripeCardInput";

export const useStripeCardInput = () => {
  const stripe = useStripe();
  const elements = useElements();

  const getPaymentMethod = async () => {
    if (elements && stripe) {
      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement
        });

        if (error) throw error;
        return paymentMethod;
      }
    }
  };

  return { StripeCardInput, getPaymentMethod };
};
