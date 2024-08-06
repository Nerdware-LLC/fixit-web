import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptionsMode } from "@stripe/stripe-js";
import { useTheme, rgbToHex } from "@mui/material/styles";
import { ENV } from "@/app/env";
import { StripeFormContent, type StripeFormContentProps } from "./StripeFormContent.jsx";
import type { Simplify, Except } from "type-fest";

if (!ENV.STRIPE_PUBLISHABLE_KEY) {
  throw new Error("Unable to load Stripe.");
}

const stripePromise = loadStripe(ENV.STRIPE_PUBLISHABLE_KEY);

/**
 * A form wrapped in the Stripe {@link Elements} provider.
 *
 * Relevant Stripe Docs:
 *
 * - [Stripe Elements](https://stripe.com/docs/stripe-js/react#elements-provider)
 * - [Stripe Appearance API](https://stripe.com/docs/elements/appearance-api?platform=web)
 * - [Stripe Appearance API: Variables](https://stripe.com/docs/elements/appearance-api?platform=web#variables)
 */
export const StripeForm = ({ stripeElementsOptions = {}, ...props }: StripeFormProps) => {
  const { palette } = useTheme();

  const { mode, secondary, text, success, warning, error } = palette;

  const elementsOptions: StripeElementsOptionsMode = {
    // CALLER-PROVIDED OPTIONS:
    ...stripeElementsOptions,
    paymentMethodCreation: "manual",
    // https://stripe.com/docs/elements/appearance-api?platform=web
    appearance: {
      theme: mode === "dark" ? "night" : "stripe",
      labels: "floating",
      // https://stripe.com/docs/elements/appearance-api?platform=web#variables
      variables: {
        // font
        fontFamily: "Roboto, sans-serif",
        fontSizeBase: "16px",
        fontSmooth: "always", // enables anti-aliasing
        // colors
        colorPrimary: secondary.main, // the PaymentInput doesn't look good with orange
        colorText: text.primary,
        colorTextPlaceholder: text.disabled,
        colorSuccess: success.main,
        colorSuccessText: success.main,
        colorWarning: warning.main,
        colorWarningText: warning.main,
        colorDanger: rgbToHex(error.main), // <-- Stripe logs warning if provided rgba here
        colorDangerText: error.main,
        colorIconCardError: error.main,
        colorIconCardCvcError: error.main,
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={elementsOptions}>
      <StripeFormContent {...props} />
    </Elements>
  );
};

/**
 * Options for the {@link Elements|Stripe Elements context provider} (uses "mode").
 */
export type StripeFormElementsOptions = Simplify<StripeElementsOptionsMode>;

export type StripeFormProps = {
  stripeElementsOptions?: Except<StripeFormElementsOptions, "paymentMethodCreation" | "appearance">;
} & StripeFormContentProps;
