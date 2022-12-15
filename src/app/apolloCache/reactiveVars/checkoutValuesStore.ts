import { ReactiveStore } from "./ReactiveStore";
import { storage } from "@utils";
import type { UserSubscriptionPriceLabel } from "@types";

export const checkoutValuesStore = new ReactiveStore<StoredCheckoutValues>(
  !!storage.getCheckoutValues()
) as CheckoutValuesStore;

checkoutValuesStore.setCheckoutValues = ({
  selectedSubscription,
  promoCode
}: StoredCheckoutValues) => {
  storage.setCheckoutValues({ selectedSubscription, promoCode });
  checkoutValuesStore.set({ selectedSubscription, promoCode });
};

checkoutValuesStore.clearStoredValues = () => {
  storage.removeCheckoutValues();
  checkoutValuesStore.set({ selectedSubscription: null, promoCode: null });
};

type CheckoutValuesStore = {
  setCheckoutValues: ({ selectedSubscription, promoCode }: StoredCheckoutValues) => void;
  clearStoredValues: () => void;
} & ReactiveStore<StoredCheckoutValues>;

export type StoredCheckoutValues = {
  selectedSubscription: UserSubscriptionPriceLabel;
  promoCode: string | null;
};
