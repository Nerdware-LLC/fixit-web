import { useNavigate } from "react-router-dom";
import { checkoutValuesStore, type StoredCheckoutValues } from "@cache/checkoutValuesStore";
import { ProductInfoBox } from "./ProductInfoBox";
import { PRICE_INFO } from "./productPricingInfo";
import type { UserSubscriptionPriceLabel } from "@types";

/**
 * Product selection for desktop layout
 * - Maps each product to a `ProductInfoBox`
 */
export const MappedRowOfProductBoxes = ({ selectedSubscription }: StoredCheckoutValues) => {
  const nav = useNavigate();

  const handleClickContainer = (priceLabel: UserSubscriptionPriceLabel) => {
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
              else nav("/checkout");
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
    UserSubscriptionPriceLabel,
    {
      PRICE_NAME: string;
      PRICE_AMOUNT: string;
      PRICE_DESCRIPTION: string;
    }
  ]
>;
