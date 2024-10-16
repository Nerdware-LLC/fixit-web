import { ReactiveStore, LocalStorageValueManager } from "./helpers";
import type { SubscriptionPriceName } from "@/types/graphql.js";

/**
 * The values stored in the {@link checkoutValuesStore}.
 */
export type CheckoutValues = {
  selectedSubscription: SubscriptionPriceName | null;
  promoCode: string | null;
  discountPercentage: number | null;
};

/**
 * A `LocalStorageValueManager` instance for the `"checkoutValues"` key.
 *
 * Used by the {@link checkoutValuesStore} to manage checkout-flow values.
 */
const checkoutValuesLocalStorage = new LocalStorageValueManager<CheckoutValues>("checkoutValues", {
  initialValue: { selectedSubscription: null, promoCode: null, discountPercentage: null },
});

export const checkoutValuesStore = new ReactiveStore<CheckoutValues>({
  storageValueManager: checkoutValuesLocalStorage,
});
