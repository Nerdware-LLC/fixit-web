import { PaymentElement, type PaymentElementProps } from "@stripe/react-stripe-js";
import { authenticatedUserStore } from "@/stores/authenticatedUserStore";
import { useStripePaymentInput } from "./useStripePaymentInput";
import type { Except } from "type-fest";

/**
 * Stripe [PaymentElement][url-payment-element] configured for [subscription
 * payments][url-accept-sub-payment]. This component reads values stored in the
 * `authenticatedUserStore` to populate the `options.defaultValues` prop.
 *
 * > Providing `options.defaultValues.billingDetails.email` enables [payments
 *   via Link][url-what-is-link].
 *
 * Relevant Stripe Docs:
 *
 * - [Payment Element][url-payment-element]
 * - [Accept a subscription payment][url-accept-sub-payment]
 * - [What is Link?][url-what-is-link]
 *
 * [url-payment-element]: https://stripe.com/docs/payments/payment-element
 * [url-accept-sub-payment]: https://stripe.com/docs/payments/accept-a-payment-deferred?platform=web&type=subscription
 * [url-what-is-link]: https://stripe.com/docs/payments/link/what-is-link
 */
export const StripePaymentInput = ({
  onChange,
  ...paymentElementProps
}: StripePaymentInputProps) => {
  const { email, phone, profile } = authenticatedUserStore.useSubToStore<true>();

  const { givenName, familyName } = profile;

  return (
    <PaymentElement
      onChange={onChange}
      options={{
        layout: "tabs",
        defaultValues: {
          billingDetails: {
            // Only `email` is required to enable Link, but more info = more streamlined checkout.
            email,
            ...(phone && { phone }),
            ...(!!givenName &&
              !!familyName && {
                // Stripe examples use the western `firstName lastName` convention for `name`:
                name: `${givenName} ${familyName}`,
              }),
          },
        },
      }}
      {...paymentElementProps}
    />
  );
};

StripePaymentInput.use = useStripePaymentInput;

export type StripePaymentInputProps = Except<PaymentElementProps, "id" | "options">;
