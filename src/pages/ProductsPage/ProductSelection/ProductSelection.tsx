import { styled } from "@mui/material/styles";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore.js";
import { MappedRowOfProductBoxes } from "./MappedRowOfProductBoxes.jsx";
import { SingleProductBox } from "./SingleProductBox.jsx";
import type { IsMobilePageLayout } from "@/app/PageLayoutContext";

export type ProductSelectionProps = IsMobilePageLayout;

/**
 * Notes regarding ProductSelection on **mobile** devices/layouts:
 *
 * - On mobile, to simplify the UI/UX, only TRIAL/ANNUAL subs are selectable.
 *
 * - SingleProductBox needs `selectedSubscription` to have a value, so if it's not
 *   set on mobile, "TRIAL" is set as the default value on first render.
 *
 * - When TRIAL is selected, ProductInfoBox will display MONTHLY's price info text
 *   to ensure the user is informed of the post-trial pricing, and the checkout
 *   button will display "Start Trial" to ensure the user is informed that they'll
 *   be proceeding with a trial (this is exactly what Stripe's pricing tables do).
 */
export const ProductSelection = ({ isMobilePageLayout }: ProductSelectionProps) => {
  const checkoutValues = checkoutValuesStore.useSubToStore();

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
  flexDirection: variables.isMobilePageLayout ? "column" : "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "inherit",
}));
