import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { checkoutValuesStore, StoredCheckoutValues } from "@cache/checkoutValuesStore";
import { ProductInfoBox } from "./ProductInfoBox";
import { SingleProductBoxSwitch } from "./SingleProductBoxSwitch";
import { PRICE_INFO } from "./productPricingInfo";
import type { UserSubscriptionPriceLabel } from "@types";

/**
 * Product selection for mobile layout
 * - Only one `ProductInfoBox` is displayed
 * - Users can switch between offerings via Mui Switch component
 * - On mobile, to simplify the UI/UX only TRIAL/ANNUAL subscriptions are
 *   selectable (TRIAL will display MONTHLY's PRICE_INFO text, but the
 *   checkout button label is set to "Start Trial" to avoid ambiguity).
 */
export const SingleProductBox = ({ selectedSubscription, promoCode }: StoredCheckoutValues) => {
  const priceInfoToDisplay = selectedSubscription === "ANNUAL" ? "ANNUAL" : "MONTHLY";

  // Currently selected subscription:
  const { PRICE_NAME, PRICE_AMOUNT, PRICE_DESCRIPTION } = PRICE_INFO[priceInfoToDisplay];

  // The Switch's "other" option:
  const switchOtherProduct: { priceLabel: UserSubscriptionPriceLabel; tooltipTitle: string } =
    selectedSubscription === "ANNUAL"
      ? {
          priceLabel: "TRIAL", // on mobile MONTHLY defaults to TRIAL (see jsdoc)
          tooltipTitle: "Switch to monthly subscription",
        }
      : {
          priceLabel: "ANNUAL",
          tooltipTitle: "Switch to annual subscription",
        };

  const handleSwitchProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    checkoutValuesStore.set({
      selectedSubscription: switchOtherProduct.priceLabel,
      promoCode: promoCode ?? null,
    });
  };

  return (
    <>
      <Tooltip title={switchOtherProduct.tooltipTitle}>
        <Box
          style={{
            width: "clamp(14rem, 66%, 20rem)",
            height: "4rem",
            marginBottom: "1rem",
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
        priceName={PRICE_NAME}
        priceAmount={PRICE_AMOUNT}
        priceDescription={PRICE_DESCRIPTION}
        showMostPopularBadge={selectedSubscription === "ANNUAL"}
        buttonLabel={selectedSubscription === "ANNUAL" ? "Subscribe" : "Start Trial"}
      />
    </>
  );
};
