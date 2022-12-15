import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ENV } from "@config";
import { element } from "@types";

const stripePromise = loadStripe(ENV.STRIPE.PUBLISHABLE_KEY);

export const StripeContextProvider = ({ children }: { children: React.ReactNode }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);

StripeContextProvider.propTypes = {
  children: element.isRequired
};
