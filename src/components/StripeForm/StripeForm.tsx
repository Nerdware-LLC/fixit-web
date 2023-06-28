import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ENV } from "@app/env";
import { StripeFormElements, type StripeFormElementsProps } from "./StripeFormElements";

const stripePromise = loadStripe(ENV.STRIPE_PUBLISHABLE_KEY);

/**
 * A form wrapped in the Stripe Elements provider.
 */
export const StripeForm = (props: StripeFormElementsProps) => (
  <Elements stripe={stripePromise}>
    <StripeFormElements {...props} />
  </Elements>
);

export type StripeFormProps = StripeFormElementsProps;
