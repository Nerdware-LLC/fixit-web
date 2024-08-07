import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { APP_PATHS } from "@/routes/appPaths.js";
import { checkoutValuesStore, CheckoutValues } from "@/stores/checkoutValuesStore.js";
import { SUB_PRICING_DISPLAY_CONFIGS } from "@/types/UserSubscription.js";
import { intToCurrencyStr } from "@/utils/formatters/currency.js";
import { ProductInfoBox } from "./ProductInfoBox.jsx";
import { SingleProductBoxSwitch } from "./SingleProductBoxSwitch.jsx";
import type { SubscriptionPriceName } from "@/types/graphql.js";

/**
 * Product selection for mobile layout
 * - Only one `ProductInfoBox` is displayed
 * - Users can switch between offerings via Mui Switch component
 * - On mobile, to simplify the UI/UX only TRIAL/ANNUAL subscriptions are
 *   selectable (TRIAL will display MONTHLY's price info text, but the
 *   checkout button label is set to "Start Trial" to avoid ambiguity).
 * - If `selectedSubscription` has not been set in `checkoutValuesStore`,
 *   it is initialized to TRIAL before nav'ing to /checkout.
 */
export const SingleProductBox = ({ selectedSubscription }: CheckoutValues) => {
  const nav = useNavigate();

  const priceInfoToDisplay = selectedSubscription === "ANNUAL" ? "ANNUAL" : "MONTHLY";

  // Currently selected subscription:
  const { prettyName, price, billingPeriod } = SUB_PRICING_DISPLAY_CONFIGS[priceInfoToDisplay];

  // The Switch's "other" option:
  const switchOtherProduct: { priceName: SubscriptionPriceName; tooltipTitle: string } =
    selectedSubscription === "ANNUAL"
      ? {
          priceName: "TRIAL", // on mobile MONTHLY defaults to TRIAL (see jsdoc)
          tooltipTitle: "Switch to monthly subscription",
        }
      : {
          priceName: "ANNUAL",
          tooltipTitle: "Switch to annual subscription",
        };

  const handleSwitchProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    checkoutValuesStore.mergeUpdate({
      selectedSubscription: switchOtherProduct.priceName,
    });
  };

  const handleClickButton = () => nav(APP_PATHS.CHECKOUT);

  return (
    <>
      <Tooltip
        title={switchOtherProduct.tooltipTitle}
        placement={priceInfoToDisplay === "ANNUAL" ? "bottom-start" : "bottom-end"}
      >
        <Box
          style={{
            width: "clamp(14rem, 66%, 20rem)",
            height: "4rem",
            borderRadius: "1rem",
            backgroundColor: "transparent",
          }}
        >
          <SingleProductBoxSwitch
            checked={selectedSubscription === "ANNUAL"}
            handleChange={handleSwitchProducts}
          />
        </Box>
      </Tooltip>
      <ProductInfoBox
        priceName={prettyName}
        priceAmount={intToCurrencyStr(price)}
        priceDescription={`per\n${billingPeriod}`}
        showMostPopularBadge={selectedSubscription === "ANNUAL"}
        buttonLabel={selectedSubscription === "TRIAL" ? "Start Trial" : "Subscribe"}
        onClickButton={handleClickButton}
      />
    </>
  );
};
