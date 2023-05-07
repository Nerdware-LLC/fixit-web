import { checkoutValuesStore, type StoredCheckoutValues } from "@cache/checkoutValuesStore";
import { ProductInfoBox } from "./ProductInfoBox";
import { PRICE_INFO } from "./productPricingInfo";
import type { UserSubscriptionPriceLabel } from "@types";

const PRICE_INFO_ENTRIES = Object.entries(PRICE_INFO) as Array<
  [
    UserSubscriptionPriceLabel,
    {
      PRICE_NAME: string;
      PRICE_AMOUNT: string;
      PRICE_DESCRIPTION: string;
    }
  ]
>;

/**
 * Product selection for desktop layout
 * - Maps each product to a `ProductInfoBox`
 */
export const MappedRowOfProductBoxes = ({
  selectedSubscription,
  promoCode,
}: StoredCheckoutValues) => (
  <>
    {PRICE_INFO_ENTRIES.map(([priceLabel, { PRICE_NAME, PRICE_AMOUNT, PRICE_DESCRIPTION }]) => (
      <ProductInfoBox
        key={`ProductInfoDisplay:${priceLabel}`}
        priceName={PRICE_NAME}
        priceAmount={PRICE_AMOUNT}
        priceDescription={PRICE_DESCRIPTION}
        showMostPopularBadge={priceLabel === "ANNUAL"}
        isSelected={selectedSubscription === priceLabel}
        handleClickProduct={() =>
          checkoutValuesStore.set({
            selectedSubscription: priceLabel,
            promoCode: promoCode ?? null,
          })
        }
      />
    ))}
  </>
);
