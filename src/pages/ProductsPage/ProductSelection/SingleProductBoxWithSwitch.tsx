import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { checkoutValuesStore } from "@app";
import { PRICE_INFO } from "./productPricingInfo";
import { ProductInfoBox } from "./ProductInfoBox";
import type { StoredCheckoutValues } from "@app";
import type { UserSubscriptionPriceLabel } from "@types";

/**
 * Product selection for mobile layout
 * - Only one `ProductInfoBox` is displayed
 * - Users can switch between offerings via Mui Switch component
 * - On mobile, to simplify the UI/UX only TRIAL/ANNUAL subscriptions are
 *   selectable (TRIAL will display MONTHLY's PRICE_INFO text, but the
 *   checkout button label is set to "Start Trial" to avoid ambiguity).
 */
export const SingleProductBoxWithSwitch = ({
  selectedSubscription,
  promoCode
}: StoredCheckoutValues) => {
  const priceInfoToDisplay = selectedSubscription === "ANNUAL" ? "ANNUAL" : "MONTHLY";

  // Currently selected subscription:
  const { PRICE_NAME, PRICE_AMOUNT, PRICE_DESCRIPTION } = PRICE_INFO[priceInfoToDisplay];

  // The Switch's "other" option:
  const switchOtherProduct: { priceLabel: UserSubscriptionPriceLabel; tooltipTitle: string } =
    selectedSubscription === "ANNUAL"
      ? {
          priceLabel: "TRIAL", // on mobile MONTHLY defaults to TRIAL (see jsdoc)
          tooltipTitle: "Switch to monthly subscription"
        }
      : {
          priceLabel: "ANNUAL",
          tooltipTitle: "Switch to annual subscription"
        };

  const handleSwitchProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    checkoutValuesStore.set({
      selectedSubscription: switchOtherProduct.priceLabel,
      promoCode: promoCode ?? null
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
            backgroundColor: "transparent"
          }}
        >
          <ProductSwitch
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

const ProductSwitch = ({
  checked,
  handleChange
}: {
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <StyledProductSwitchContainer>
      <div style={{ left: 4 }}>
        <Text>Monthly</Text>
      </div>
      <div style={{ right: 4 }}>
        <Text>Yearly</Text>
      </div>
      <input type="checkbox" onChange={handleChange} checked={checked} aria-label="controlled" />
      <span className="product-switch-slider-thumb" />
    </StyledProductSwitchContainer>
  );
};

/**
 * The box around the slider
 */
const StyledProductSwitchContainer = styled("label")(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "clamp(14rem, 100%, 20rem)",
  height: "100%",
  padding: "0.25rem 0.1rem",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "1rem",
  cursor: "pointer",
  zIndex: 5,

  // Child Text-containing divs
  "& > div": {
    position: "absolute",
    height: "100%",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,

    // Child Mui Text (labels "Monthly" and "Yearly")
    "& .MuiTypography-root": {
      alignSelf: "center",
      margin: "auto",
      fontWeight: "bold"
    }
  },

  // The HTML checkbox input (hidden)
  '& > input[type="checkbox"]': {
    opacity: 0,
    width: 0,
    height: 0,

    // When it's checked, change the span's transition left/right values
    "&:checked + span.product-switch-slider-thumb": {
      transform: "translateX(calc(100% - 8px))"
    }
  },

  // The visible slider thumb
  "& span.product-switch-slider-thumb": {
    position: "absolute",
    top: "4px",
    bottom: "4px",
    left: "4px",

    transform: "translateX(0)",
    transition: "transform 0.4s",

    height: "calc(100% - 8px)",
    width: "50%",
    borderRadius: "0.85rem",
    backgroundColor: theme.palette.primary.main,
    boxShadow: `inset 0rem 0rem 1rem 0.5rem ${theme.palette.primary.dark}`
  }
}));
