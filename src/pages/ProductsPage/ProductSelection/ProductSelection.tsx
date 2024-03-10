import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore";
import { USER_SUBSCRIPTION_PRICE_LABELS } from "@/types/UserSubscription";
import { MappedRowOfProductBoxes } from "./MappedRowOfProductBoxes";
import { SingleProductBox } from "./SingleProductBox";
import type { IsMobilePageLayout } from "@/app/PageLayoutContext";

/**
 * Notes regarding ProductSelection on **mobile** devices/layouts:
 *
 * - On mobile, to simplify the UI/UX, only TRIAL/ANNUAL subs are selectable.
 *
 * - SingleProductBox needs `selectedSubscription` to have a value, so if it's not
 *   set on mobile, "TRIAL" is set as the default value on first render.
 *
 * - When TRIAL is selected, ProductInfoBox will display MONTHLY's PRICE_INFO text
 *   to ensure the user is informed of the post-trial pricing, and the checkout
 *   button will display "Start Trial" to ensure the user is informed that they'll
 *   be proceeding with a trial (this is exactly what Stripe's pricing tables do).
 */
export const ProductSelection = ({ isMobilePageLayout }: ProductSelectionProps) => {
  const checkoutValues = checkoutValuesStore.useSubToStore();

  // On mobile set "TRIAL" as default sub if no selection yet exists (see jsdoc)
  useEffect(() => {
    if (
      isMobilePageLayout &&
      !!checkoutValues.selectedSubscription &&
      !USER_SUBSCRIPTION_PRICE_LABELS.includes(checkoutValues.selectedSubscription)
    ) {
      checkoutValuesStore.set({
        selectedSubscription: "TRIAL",
        promoCode: checkoutValues.promoCode ?? null,
      });
    }
  }, [isMobilePageLayout, checkoutValues]);

  return (
    <StyledDiv>
      {isMobilePageLayout ? (
        <SingleProductBox {...checkoutValues} />
      ) : (
        <MappedRowOfProductBoxes {...checkoutValues} />
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(({ theme: { variables } }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",

  ...(variables.isMobilePageLayout
    ? {
        flexDirection: "column",
        gap: "inherit",
        justifyContent: "space-between",
      }
    : {
        flexDirection: "row",
        justifyContent: "space-between",
        // Add horizontal margin to middle ProductInfoDisplay container
        "&>*:nth-of-type(2)": {
          // TODO use classname/elementIDs here instead of nth-of-type
          margin: "0 1rem",
        },
      }),
}));

export type ProductSelectionProps = IsMobilePageLayout;
