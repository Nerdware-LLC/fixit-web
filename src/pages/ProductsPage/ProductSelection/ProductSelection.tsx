import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { checkoutValuesStore } from "@app";
import { CONSTANTS } from "@types";
import { SingleProductBoxWithSwitch } from "./SingleProductBoxWithSwitch";
import { MappedRowOfProductBoxes } from "./MappedRowOfProductBoxes";

/**
 * Notes regarding ProductSelection on **mobile** devices/layouts:
 *
 * - On mobile, to simplify the UI/UX, only TRIAL/ANNUAL subs are selectable.
 *
 * - SingleProductBoxWithSwitch needs `selectedSubscription` to have a value, so
 *   if it's not set on mobile, "TRIAL" is set as the default value on first render.
 *
 * - When TRIAL is selected, ProductInfoBox will display MONTHLY's PRICE_INFO text
 *   to ensure the user is informed of the post-trial pricing, and the checkout
 *   button will display "Start Trial" to ensure the user is informed that they'll
 *   be proceeding with a trial (this is exactly what Stripe's pricing tables do).
 */
export const ProductSelection = ({ isMobilePageLayout }: { isMobilePageLayout: boolean }) => {
  const checkoutValues = checkoutValuesStore.useSubToStore();

  // On mobile set "TRIAL" as default sub if no selection yet exists (see jsdoc)
  useEffect(() => {
    if (
      isMobilePageLayout &&
      !!checkoutValues.selectedSubscription &&
      !CONSTANTS.USER_SUBSCRIPTION.PRICE_LABELS.includes(checkoutValues.selectedSubscription)
    ) {
      checkoutValuesStore.set({
        selectedSubscription: "TRIAL",
        promoCode: checkoutValues.promoCode ?? null
      });
    }
  }, [isMobilePageLayout, checkoutValues]);

  return (
    <ProductSelectionContainer>
      {isMobilePageLayout ? (
        <SingleProductBoxWithSwitch {...checkoutValues} />
      ) : (
        <MappedRowOfProductBoxes {...checkoutValues} />
      )}
    </ProductSelectionContainer>
  );
};

const ProductSelectionContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [`@media (min-width: ${theme.breakpoints.values.md}) or (min-aspect-ratio: 1/1)`]: {
    // On desktop/large displays, switch container flex-dir to row
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    // Add horizontal margin to middle ProductInfoDisplay container
    "&>*:nth-of-type(2)": {
      margin: "0 1rem"
    }
  }
}));
