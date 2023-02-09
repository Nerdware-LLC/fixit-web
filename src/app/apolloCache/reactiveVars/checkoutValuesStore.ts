import { ReactiveStore } from "./ReactiveStore";
import type { UserSubscriptionPriceLabel } from "@types";

export const checkoutValuesStore = new ReactiveStore<StoredCheckoutValues>({
  storageKey: "checkoutValues",
  defaultValue: { selectedSubscription: null, promoCode: null }
});

/**
 * A type for when selectedSub has been confirmed to not be null.
 */
export type CheckoutValues = {
  selectedSubscription: UserSubscriptionPriceLabel;
  promoCode: string | null;
};

export type StoredCheckoutValues = {
  selectedSubscription: UserSubscriptionPriceLabel | null;
  promoCode: string | null;
};
