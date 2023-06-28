import { styled } from "@mui/material/styles";
import { chipClasses as muiChipClasses } from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Text, { typographyClasses } from "@mui/material/Typography";
import { ENV } from "@app/env";
import { checkoutValuesStore } from "@cache/checkoutValuesStore";
import { formatNum } from "@utils/formatNum";
import { PromoCodeInput } from "./PromoCodeInput";
import { SwitchToAnnual } from "./SwitchToAnnual";
import { checkoutPageClassNames } from "./classNames";
import type { SubscriptionPriceLabel } from "@graphql/types";

/**
 * **SubCostDetails** displays pricing info the the user.
 *
 * > `The values used here are for DISPLAY PURPOSES ONLY - they merely
 *   convey information to the user. All pricing/product info is stored
 *   and/or calculated by the backend API; sending invalid pricing/product
 *   info to the server results a 400 response.`
 */
export const SubCostDetails = () => {
  const { selectedSubscription, promoCode } = checkoutValuesStore.useSubToStore();

  // When SubCostDetails renders, selectedSubscription should always be available
  if (!selectedSubscription) return null;

  const {
    label,
    price,
    billingPeriod = null,
    trialDays = null,
    afterTrial = null,
  } = SUB_DICT_DISPLAY_PARAMS[selectedSubscription];

  const priceStr = formatNum.toCurrencyStr(price);
  const afterTrialPriceStr = afterTrial ? formatNum.toCurrencyStr(afterTrial.price) : null;

  // NOTE: These calculated values are for display purposes only - see above jsdoc for <SubCostDetails />.
  const totalDueToday_DISPLAY_ONLY = getTotal_DISPLAY_ONLY(price, promoCode);
  const totalAfterTrial_DISPLAY_ONLY = afterTrial
    ? getTotal_DISPLAY_ONLY(afterTrial.price, promoCode)
    : null;

  return (
    <StyledDiv className={checkoutPageClassNames.subCostDetails.container}>
      <div className={checkoutPageClassNames.subCostDetails.priceLabelContainer}>
        <Text className={checkoutPageClassNames.baseText}>{label}</Text>
        <div>
          <Text>{billingPeriod ? priceStr : `${trialDays} days free`}</Text>
          {!!billingPeriod && <span>{`per\n${billingPeriod}`}</span>}
        </div>
        {!!afterTrial && (
          <Text variant="caption" className={checkoutPageClassNames.baseText}>
            Then {afterTrialPriceStr} per {afterTrial.billingPeriod}
          </Text>
        )}
      </div>
      <div className={checkoutPageClassNames.subCostDetails.priceInfoColumn}>
        <div className={checkoutPageClassNames.subCostDetails.priceInfoRow}>
          <Text className={checkoutPageClassNames.baseText} style={{ whiteSpace: "normal" }}>
            Fixit Subscription
          </Text>
          <Text
            className={checkoutPageClassNames.baseText}
            style={{ textAlign: "right", marginLeft: "1rem" }}
          >
            {billingPeriod ? `${priceStr} / ${billingPeriod}` : `${trialDays} days free`}
          </Text>
        </div>
        <div
          className={checkoutPageClassNames.subCostDetails.priceInfoRow}
          style={{ maxHeight: "1rem", alignItems: "flex-end" }}
        >
          {!!billingPeriod && (
            <Text variant="caption" className={checkoutPageClassNames.baseText}>
              Billed {billingPeriod}ly
            </Text>
          )}
          {!!afterTrial && (
            <Text variant="caption" className={checkoutPageClassNames.baseText}>
              Then {afterTrialPriceStr} per {afterTrial.billingPeriod} thereafter
            </Text>
          )}
        </div>
        <SwitchToAnnual />
      </div>
      <div className={checkoutPageClassNames.subCostDetails.priceInfoRow}>
        <Text className={checkoutPageClassNames.baseText}>Subtotal</Text>
        <Text className={checkoutPageClassNames.baseText}>{priceStr}</Text>
      </div>
      <Divider />
      <PromoCodeInput />
      <Divider />
      {!!afterTrial && (
        <div className={checkoutPageClassNames.subCostDetails.priceInfoRow}>
          <Text className={checkoutPageClassNames.baseText}>Total after trial</Text>
          <Text className={checkoutPageClassNames.baseText}>{totalAfterTrial_DISPLAY_ONLY}</Text>
        </div>
      )}
      <div className={checkoutPageClassNames.subCostDetails.priceInfoRow}>
        <Text className={checkoutPageClassNames.baseText}>Total due today</Text>
        <Text className={checkoutPageClassNames.baseText}>{totalDueToday_DISPLAY_ONLY}</Text>
      </div>
    </StyledDiv>
  );
};

// NOTE: These values are for display purposes only - see above jsdoc for <SubCostDetails />.
export const SUB_DICT_DISPLAY_PARAMS: Record<
  SubscriptionPriceLabel,
  SubPlanPricingDisplayParams & {
    label: string;
    trialDays?: number;
    afterTrial?: Required<SubPlanPricingDisplayParams>;
  }
> = {
  TRIAL: {
    label: "Try Fixit",
    price: 0,
    trialDays: 14,
    afterTrial: {
      price: 500,
      billingPeriod: "month",
    },
  },
  MONTHLY: {
    label: "Monthly Subscription",
    price: 500,
    billingPeriod: "month",
  },
  ANNUAL: {
    label: "Annual Subscription",
    price: 5000,
    billingPeriod: "year",
  },
};

/**
 * This calculates values for display purposes only.
 * - See above jsdoc for <SubCostDetails />.
 */
export const getTotal_DISPLAY_ONLY = (price: number, promoCode: string | null) => {
  return formatNum.toCurrencyStr(
    typeof promoCode === "string" && (promoCode ?? "") in ENV.PROMO_CODES
      ? price - price * (ENV.PROMO_CODES[promoCode] / 100)
      : price
  );
};

const StyledDiv = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  whiteSpace: "nowrap",

  [`& .${checkoutPageClassNames.subCostDetails.priceInfoColumn}`]: {
    width: "100%",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    borderRadius: "5px",
  },

  [`& .${checkoutPageClassNames.subCostDetails.priceInfoRow}`]: {
    position: "relative",
    width: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  [`& .${muiChipClasses.root}`]: {
    marginLeft: "1rem",
    fontWeight: "bold",
    borderRadius: "3px",
  },

  [`& > .${checkoutPageClassNames.subCostDetails.priceLabelContainer}`]: {
    "& > div:first-of-type": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      whiteSpace: "pre",

      [`& > .${typographyClasses.root}:first-of-type`]: {
        fontSize: "clamp(2.5rem, 10vw, 3rem)",
        lineHeight: "3.25rem",
        margin: "0 0.5rem 0 0",
      },

      "& > span:first-of-type": {
        width: "100%",
        display: "inline-block",
        whiteSpace: "pre",
        fontWeight: "normal",
        lineHeight: "1.35rem",
      },

      [`& > .${typographyClasses.root}.${typographyClasses.caption}`]: {
        margin: "0.1rem 0 0 0",
      },
    },
  },
}));

type SubPlanPricingDisplayParams = {
  price: number;
  billingPeriod?: "month" | "year";
};
