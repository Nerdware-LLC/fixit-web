import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CONFIG } from "../../config";
import { element } from "../../types";

const stripePromise = loadStripe(CONFIG.STRIPE.PUBLISHABLE_KEY);

export const StripeContextProvider = ({ children }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);

StripeContextProvider.propTypes = {
  children: element.isRequired
};
