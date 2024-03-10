import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "@/routes/appPaths";
import { checkoutValuesStore, type StoredCheckoutValues } from "@/stores/checkoutValuesStore";
import { ProductInfoBox } from "./ProductInfoBox";
import { PRICE_INFO } from "./productPricingInfo";
import type { SubscriptionPriceLabel } from "@/graphql/types";

/**
 * Product selection for desktop layout
 * - Maps each product to a `ProductInfoBox`
 */
export const MappedRowOfProductBoxes = ({ selectedSubscription }: StoredCheckoutValues) => {
  const nav = useNavigate();

  const handleClickContainer = (priceLabel: SubscriptionPriceLabel) => {
    checkoutValuesStore.mergeUpdate({
      selectedSubscription: priceLabel,
    });
  };

  return (
    <>
      {PRICE_INFO_ENTRIES.map(([priceLabel, { PRICE_NAME, PRICE_AMOUNT, PRICE_DESCRIPTION }]) => {
        const isSelected = selectedSubscription === priceLabel;

        return (
          <ProductInfoBox
            key={`ProductInfoDisplay:${priceLabel}`}
            priceName={PRICE_NAME}
            priceAmount={PRICE_AMOUNT}
            priceDescription={PRICE_DESCRIPTION}
            showMostPopularBadge={priceLabel === "ANNUAL"}
            buttonLabel={!isSelected ? "Select" : "Subscribe"}
            onClickButton={() => {
              if (!isSelected) handleClickContainer(priceLabel);
              else nav(APP_PATHS.CHECKOUT);
            }}
            onClickContainer={() => handleClickContainer(priceLabel)}
            sx={({ palette }) => ({
              ...(isSelected && { borderColor: palette.secondary.main }),
            })}
          />
        );
      })}
    </>
  );
};

const PRICE_INFO_ENTRIES = Object.entries(PRICE_INFO) as Array<
  [
    SubscriptionPriceLabel,
    {
      PRICE_NAME: string;
      PRICE_AMOUNT: string;
      PRICE_DESCRIPTION: string;
    },
  ]
>;
