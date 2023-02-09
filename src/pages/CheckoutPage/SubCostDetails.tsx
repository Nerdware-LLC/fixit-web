import { styled } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { SwitchToAnnual } from "./SwitchToAnnual";
import { PromoCodeInput } from "./PromoCodeInput";
import { checkoutValuesStore, type CheckoutValues } from "@app";
import { ENV } from "@config";
import { formatNum } from "@utils";
import type { UserSubscriptionPriceLabel } from "@types";

/**
 * **SubCostDetails** displays pricing info the the user.
 *
 * > `The values used here are for DISPLAY PURPOSES ONLY - they merely
 *   convey information to the user. All pricing/product info is stored
 *   and/or calculated by the backend API; sending invalid pricing/product
 *   info to the server results a 400 response.`
 */
export const SubCostDetails = () => {
  const { selectedSubscription, promoCode } = checkoutValuesStore.useSubToStore() as CheckoutValues;

  const {
    label,
    price,
    billingPeriod = null,
    trialDays = null,
    afterTrial = null
  } = SUB_DICT_DISPLAY_PARAMS[selectedSubscription];

  const priceStr = formatNum.toCurrencyStr(price);
  const afterTrialPriceStr = afterTrial ? formatNum.toCurrencyStr(afterTrial.price) : null;

  // NOTE: These calculated values are for display purposes only - see above jsdoc for <SubCostDetails />.
  const totalDueToday_DISPLAY_ONLY = getTotal_DISPLAY_ONLY(price, promoCode);
  const totalAfterTrial_DISPLAY_ONLY = afterTrial
    ? getTotal_DISPLAY_ONLY(afterTrial.price, promoCode)
    : null;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        whiteSpace: "nowrap"
      }}
    >
      <div>
        <StyledText>{label}</StyledText>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            whiteSpace: "pre"
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 10vw, 3rem)",
              lineHeight: "3.25rem",
              margin: "0 0.5rem 0 0"
            }}
          >
            {billingPeriod ? priceStr : `${trialDays} days free`}
          </h1>
          {!!billingPeriod && (
            <span
              style={{
                width: "100%",
                display: "inline-block",
                whiteSpace: "pre",
                fontWeight: "normal",
                lineHeight: "1.35rem"
              }}
            >
              {`per\n${billingPeriod}`}
            </span>
          )}
        </div>
        {!!afterTrial && (
          <StyledText variant="caption" style={{ margin: "0.1rem 0 0 0" }}>
            Then {afterTrialPriceStr} per {afterTrial.billingPeriod}
          </StyledText>
        )}
      </div>
      <StyledPriceInfoContainer>
        <PriceInfoRow>
          <StyledText style={{ whiteSpace: "normal" }}>Fixit Subscription</StyledText>
          <StyledText style={{ textAlign: "right", marginLeft: "1rem" }}>
            {billingPeriod ? `${priceStr} / ${billingPeriod}` : `${trialDays} days free`}
          </StyledText>
        </PriceInfoRow>
        <PriceInfoRow style={{ maxHeight: "1rem", alignItems: "flex-end" }}>
          {!!billingPeriod && <StyledText variant="caption">Billed {billingPeriod}ly</StyledText>}
          {!!afterTrial && (
            <StyledText variant="caption" style={{ textAlign: "right" }}>
              Then {afterTrialPriceStr} per {afterTrial.billingPeriod} after
            </StyledText>
          )}
        </PriceInfoRow>
        <PriceInfoRow sx={{ backgroundColor: ({ palette }) => palette.divider }}>
          <SwitchToAnnual />
        </PriceInfoRow>
      </StyledPriceInfoContainer>
      <PriceInfoRow>
        <StyledText>Subtotal</StyledText>
        <StyledText>{priceStr}</StyledText>
      </PriceInfoRow>
      <Divider />
      <PriceInfoRow>
        <PromoCodeInput />
      </PriceInfoRow>
      <Divider />
      {!!afterTrial && (
        <PriceInfoRow>
          <StyledText>Total after trial</StyledText>
          <StyledText>{totalAfterTrial_DISPLAY_ONLY}</StyledText>
        </PriceInfoRow>
      )}
      <PriceInfoRow>
        <StyledText>Total due today</StyledText>
        <StyledText>{totalDueToday_DISPLAY_ONLY}</StyledText>
      </PriceInfoRow>
    </div>
  );
};

// NOTE: These values are for display purposes only - see above jsdoc for <SubCostDetails />.
export const SUB_DICT_DISPLAY_PARAMS: Record<
  UserSubscriptionPriceLabel,
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
      billingPeriod: "month"
    }
  },
  MONTHLY: {
    label: "Monthly Subscription",
    price: 500,
    billingPeriod: "month"
  },
  ANNUAL: {
    label: "Annual Subscription",
    price: 5000,
    billingPeriod: "year"
  }
};

/**
 * This calculates values for display purposes only.
 * - See above jsdoc for <SubCostDetails />.
 */
export const getTotal_DISPLAY_ONLY = (price: number, promoCode: string | null) => {
  return formatNum.toCurrencyStr(
    typeof promoCode === "string" && (promoCode ?? "") in ENV.STRIPE.PROMO_CODES
      ? price - price * (ENV.STRIPE.PROMO_CODES[promoCode] / 100)
      : price
  );
};

type SubPlanPricingDisplayParams = {
  price: number;
  billingPeriod?: "month" | "year";
};

// exported for use in PromoCodeInput
export const StyledText = styled(Text)`
  font-size: clamp(1rem, 4vw, 1.15rem);
  line-height: 1.5rem;
`;

const StyledPriceInfoContainer = styled("div")(({ theme }) => ({
  width: "100%",
  marginTop: "1rem",
  display: "flex",
  flexDirection: "column",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  borderRadius: "5px"
}));

const PriceInfoRow = styled("div")`
  position: relative;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
