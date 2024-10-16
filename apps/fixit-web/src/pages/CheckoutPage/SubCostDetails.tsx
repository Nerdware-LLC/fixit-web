import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { chipClasses } from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Text, { typographyClasses } from "@mui/material/Typography";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore.js";
import { SUB_PRICING_DISPLAY_CONFIGS } from "@/types/UserSubscription.js";
import { intToCurrencyStr, getPrice_FOR_DISPLAY_ONLY } from "@/utils/formatters/currency.js";
import { PromoCodeInput } from "./PromoCodeInput.js";
import { SwitchToAnnual } from "./SwitchToAnnual.js";
import { checkoutPageClassNames } from "./classNames.js";
import { checkoutPageElementIDs } from "./elementIDs.js";

/**
 * **SubCostDetails** displays pricing info the the user.
 *
 * > `This component is for DISPLAY PURPOSES ONLY and merely conveys information to the user.
 * >  All pricing/product info is stored and calculated by the backend API.
 * >  Sending invalid pricing/product info to the server results in a 400 response.`
 */
export const SubCostDetails = () => {
  // Route protection guarantees that these values are defined, hence the as cast
  const { selectedSubscription, discountPercentage: discount } =
    checkoutValuesStore.useSubToStore();

  const { label, price, billingPeriod, isTrial, trialDays, afterTrial } =
    SUB_PRICING_DISPLAY_CONFIGS[selectedSubscription!];

  // Note: TRIAL subs are not ellible for promo-code discounts
  const basePriceStr = intToCurrencyStr(isTrial ? afterTrial.price : price);
  const maybeDiscountedPriceStr = isTrial
    ? basePriceStr
    : getPrice_FOR_DISPLAY_ONLY(price, discount);

  return (
    <StyledDiv>
      <div id={checkoutPageElementIDs.priceHeaderRoot}>
        <Text>{label}</Text>
        <div>
          <Text>{isTrial ? `${trialDays} days free` : basePriceStr}</Text>
          {!!billingPeriod && <span>{`per\n${billingPeriod}`}</span>}
        </div>
      </div>
      <Box
        sx={({ palette }) => ({
          paddingTop: "1rem",
          border: `1px solid ${palette.divider}`,
          borderRadius: "5px",
        })}
      >
        <div className={checkoutPageClassNames.priceInfoRow}>
          <Text>Fixit Subscription</Text>
          <Text>{isTrial ? `${trialDays} days free` : `${basePriceStr} / ${billingPeriod}`}</Text>
        </div>
        <Text variant="body2" style={{ padding: "1rem" }}>
          {isTrial
            ? `Then ${basePriceStr} per ${afterTrial.billingPeriod} thereafter`
            : `Billed ${billingPeriod}ly`}
        </Text>
        <SwitchToAnnual />
      </Box>
      <div className={checkoutPageClassNames.priceInfoRow}>
        <Text>Subtotal</Text>
        <Text>{maybeDiscountedPriceStr}</Text>
      </div>
      <Divider />
      {isTrial ? (
        <Box
          className={checkoutPageClassNames.priceInfoRow}
          sx={{ backgroundColor: "divider", padding: "1rem !important" }}
        >
          <Text>Total after trial</Text>
          <Text>{basePriceStr}</Text>
        </Box>
      ) : (
        <PromoCodeInput />
      )}
      <Divider />
      <div className={checkoutPageClassNames.priceInfoRow}>
        <Text>Total due today</Text>
        <Text>{isTrial ? "$0.00" : maybeDiscountedPriceStr}</Text>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(({ theme: { palette } }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  whiteSpace: "nowrap",
  gap: "1rem",
  flexGrow: 1,

  // DEFAULTS FOR ALL DESCENDANT MUI <Text(body1)> AND <Chip> ELEMENTS:
  [`& .${typographyClasses.body1}`]: { fontSize: "clamp(1rem, 4vw, 1.15rem)" },
  [`& .${chipClasses.root}`]: {
    fontWeight: "bold",
    borderRadius: "3px",
    backgroundColor: palette.success.main,
    color: palette.success.contrastText,
    // The below styles effectively set Chip size="small"
    height: "1.5rem",
    [`& > .${chipClasses.label}`]: { padding: "0 0.5rem" },
  },

  [`& > #${checkoutPageElementIDs.priceHeaderRoot} > div`]: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "pre",

    [`& > .${typographyClasses.root}`]: {
      fontSize: "clamp(2.5rem, 10vw, 3rem)",
      lineHeight: "3.25rem",
      marginRight: "0.5rem",
    },

    "& > span": {
      width: "100%",
      display: "inline-block",
      whiteSpace: "pre",
      fontWeight: "normal",
      lineHeight: "1.35rem",
    },
  },
}));
