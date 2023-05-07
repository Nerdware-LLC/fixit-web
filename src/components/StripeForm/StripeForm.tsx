import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeFormElements, type StripeFormElementsProps } from "./StripeFormElements";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

/**
 * A form wrapped in the Stripe Elements provider.
 */
export const StripeForm = (props: StripeFormElementsProps) => (
  <Elements stripe={stripePromise}>
    <StripeFormElements {...props} />
  </Elements>
);

export type StripeFormProps = StripeFormElementsProps;
