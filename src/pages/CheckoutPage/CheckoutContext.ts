import { createContext, useContext } from "react";
import type { EncodedAuthToken, UserSubscriptionPriceLabel } from "../../types";

export interface CheckoutContextValues {
  selectedSubscription: UserSubscriptionPriceLabel;
  promoCode: string | null;
  handlePostSubmit: ({ token }: { token: EncodedAuthToken }) => Promise<void>;
}

export const CheckoutContext = createContext<CheckoutContextValues>({
  selectedSubscription: "TRIAL",
  promoCode: null,
  handlePostSubmit: async ({ token }: { token: EncodedAuthToken }) => {}
});

export const useCheckoutContext = () => useContext(CheckoutContext);
