import { storage } from "@utils/storage";
import { ReactiveStore } from "./ReactiveStore";
import type { UserSubscriptionPriceLabel } from "@types";

// For added safety, initialize stored value before exporting the store.
storage.checkoutValues.setDefaultIfEmpty({ selectedSubscription: null, promoCode: null });

export const checkoutValuesStore = new ReactiveStore<StoredCheckoutValues>({
  storageKey: "checkoutValues",
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
