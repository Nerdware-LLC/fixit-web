import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "@/routes/appPaths.js";
import { checkoutValuesStore, type CheckoutValues } from "@/stores/checkoutValuesStore.js";
import { SUB_PRICING_DISPLAY_CONFIGS } from "@/types/UserSubscription.js";
import { intToCurrencyStr } from "@/utils/formatters/currency.js";
import { ProductInfoBox } from "./ProductInfoBox.jsx";
import type { SubscriptionPriceName } from "@/types/graphql.js";

/**
 * Product selection for desktop layout
 * - Maps each product to a `ProductInfoBox`
 */
export const MappedRowOfProductBoxes = ({ selectedSubscription }: CheckoutValues) => {
  const nav = useNavigate();

  const handleClickContainer = (priceName: SubscriptionPriceName) => {
    checkoutValuesStore.mergeUpdate({
      selectedSubscription: priceName,
    });
  };

  return (
    <>
      {PRICE_INFO_ENTRIES.map(
        ([priceName, { prettyName, price, billingPeriod, isTrial, trialDays }]) => {
          const isSelected = selectedSubscription === priceName;

          return (
            <ProductInfoBox
              key={`ProductInfoDisplay:${priceName}`}
              priceName={prettyName}
              priceAmount={isTrial ? "FREE" : intToCurrencyStr(price)}
              priceDescription={
                isTrial ? `Try it FREE\nfor ${trialDays} days` : `per\n${billingPeriod}`
              }
              showMostPopularBadge={priceName === "ANNUAL"}
              buttonLabel={isSelected ? "Subscribe" : "Select"}
              onClickButton={() => {
                if (isSelected) nav(APP_PATHS.CHECKOUT);
                else handleClickContainer(priceName);
              }}
              onClickContainer={() => handleClickContainer(priceName)}
              sx={({ palette }) => ({
                ...(isSelected && { borderColor: palette.secondary.main }),
              })}
            />
          );
        }
      )}
    </>
  );
};

const PRICE_INFO_ENTRIES = Object.entries(SUB_PRICING_DISPLAY_CONFIGS) as Array<
  [SubscriptionPriceName, (typeof SUB_PRICING_DISPLAY_CONFIGS)[SubscriptionPriceName]]
>;
