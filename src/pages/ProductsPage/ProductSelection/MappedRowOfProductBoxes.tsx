import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "@/routes/appPaths.js";
import { checkoutValuesStore, type StoredCheckoutValues } from "@/stores/checkoutValuesStore.js";
import { ProductInfoBox } from "./ProductInfoBox.jsx";
import { PRICE_INFO } from "./productPricingInfo.js";
import type { SubscriptionPriceName } from "@/types/graphql.js";

/**
 * Product selection for desktop layout
 * - Maps each product to a `ProductInfoBox`
 */
export const MappedRowOfProductBoxes = ({ selectedSubscription }: StoredCheckoutValues) => {
  const nav = useNavigate();

  const handleClickContainer = (priceName: SubscriptionPriceName) => {
    checkoutValuesStore.mergeUpdate({
      selectedSubscription: priceName,
    });
  };

  return (
    <>
      {PRICE_INFO_ENTRIES.map(([priceName, { PRICE_NAME, PRICE_AMOUNT, PRICE_DESCRIPTION }]) => {
        const isSelected = selectedSubscription === priceName;

        return (
          <ProductInfoBox
            key={`ProductInfoDisplay:${priceName}`}
            priceName={PRICE_NAME}
            priceAmount={PRICE_AMOUNT}
            priceDescription={PRICE_DESCRIPTION}
            showMostPopularBadge={priceName === "ANNUAL"}
            buttonLabel={!isSelected ? "Select" : "Subscribe"}
            onClickButton={() => {
              if (!isSelected) handleClickContainer(priceName);
              else nav(APP_PATHS.CHECKOUT);
            }}
            onClickContainer={() => handleClickContainer(priceName)}
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
    SubscriptionPriceName,
    {
      PRICE_NAME: string;
      PRICE_AMOUNT: string;
      PRICE_DESCRIPTION: string;
    },
  ]
>;
