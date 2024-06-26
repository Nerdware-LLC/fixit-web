import { ReactiveStore } from "./ReactiveStore.js";
import { LocalStorageValueManager } from "./helpers";
import type { SubscriptionPriceName } from "@/types/graphql.js";

/**
 * A `LocalStorageValueManager` instance for the `"checkoutValues"` key.
 *
 * Used by the {@link checkoutValuesStore} to manage checkout-flow values.
 */
export const checkoutValuesLocalStorage = new LocalStorageValueManager<StoredCheckoutValues>(
  "checkoutValues",
  { selectedSubscription: null, promoCode: null, discountPercentage: null }
);

export const checkoutValuesStore = new ReactiveStore<StoredCheckoutValues, CheckoutValues>({
  storageValueManager: checkoutValuesLocalStorage,
});

/**
 * A type for when selectedSub has been confirmed to not be null.
 */
export type CheckoutValues = {
  selectedSubscription: SubscriptionPriceName;
  promoCode: string | null;
  discountPercentage?: number | null;
};

export type StoredCheckoutValues = {
  [K in keyof CheckoutValues]: CheckoutValues[K] | null;
};
