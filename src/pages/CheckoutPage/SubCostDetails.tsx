import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { SwitchToAnnual } from "./SwitchToAnnual";
import { PromoCodeInput } from "./PromoCodeInput";
import { checkoutValuesStore } from "@app";
import { Text } from "@components";
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
  const { selectedSubscription: sub, promoCode } = checkoutValuesStore.useSubToStore();
  const { palette } = useTheme();

  const {
    label,
    price,
    billingPeriod = null,
    trialDays = null,
    afterTrial = null
  } = SUB_DICT_DISPLAY_PARAMS[sub];

  const priceStr = formatNum.toCurrencyStr(price);
  const afterTrialPriceStr = afterTrial ? formatNum.toCurrencyStr(afterTrial.price) : null;

  // NOTE: These calculated values are for display purposes only - see above jsdoc for <SubCostDetails />.
  const totalDueToday_DISPLAY_ONLY = getTotal_DISPLAY_ONLY(price, promoCode);
  const totalAfterTrial_DISPLAY_ONLY = afterTrial
    ? getTotal_DISPLAY_ONLY(afterTrial.price, promoCode)
    : null;

  const captionStyle = {
    fontSize: "0.9rem",
    color: palette.mode === "dark" ? palette.grey[400] : palette.grey[800]
  };

  return (
    <SubDetailsContainer>
      <div>
        <StyledText>{label}</StyledText>
        <StyledPriceInfoBox>
          <h1 style={{ fontSize: "3rem", lineHeight: "3.25rem", margin: "0 0.5rem 0 0" }}>
            {billingPeriod ? priceStr : `${trialDays} days free`}
          </h1>
          {!!billingPeriod && (
            <StyledTextSpan style={{ fontWeight: "normal", lineHeight: "1.35rem" }}>
              {`per\n${billingPeriod}`}
            </StyledTextSpan>
          )}
        </StyledPriceInfoBox>
        {!!afterTrial && (
          <StyledText style={{ ...captionStyle, margin: "0.1rem 0 0 0" }}>
            Then {afterTrialPriceStr} per {afterTrial.billingPeriod}
          </StyledText>
        )}
      </div>
      <StyledPriceSurface style={{ borderColor: palette.divider, marginTop: "1rem" }}>
        <StyledPriceSurfaceRow>
          <StyledText>Fixit Subscription</StyledText>
          <StyledText style={{ textAlign: "right" }}>
            {billingPeriod ? `${priceStr} / ${billingPeriod}` : `${trialDays} days free`}
          </StyledText>
        </StyledPriceSurfaceRow>
        <StyledPriceSurfaceRow style={{ maxHeight: "1rem", alignItems: "flex-end" }}>
          {!!billingPeriod && (
            <StyledText style={captionStyle}>Billed {billingPeriod}ly</StyledText>
          )}
          {!!afterTrial && (
            <StyledText style={{ ...captionStyle, textAlign: "right" }}>
              Then {afterTrialPriceStr} per {afterTrial.billingPeriod} after
            </StyledText>
          )}
        </StyledPriceSurfaceRow>
        <StyledPriceSurfaceRow style={{ backgroundColor: palette.divider }}>
          <SwitchToAnnual />
        </StyledPriceSurfaceRow>
      </StyledPriceSurface>
      <StyledPriceSurfaceRow>
        <StyledText>Subtotal</StyledText>
        <StyledText>{priceStr}</StyledText>
      </StyledPriceSurfaceRow>
      <Divider />
      <StyledPriceSurfaceRow>
        <PromoCodeInput />
      </StyledPriceSurfaceRow>
      <Divider />
      {!!afterTrial && (
        <StyledPriceSurfaceRow>
          <StyledText>Total after trial</StyledText>
          <StyledText>{totalAfterTrial_DISPLAY_ONLY}</StyledText>
        </StyledPriceSurfaceRow>
      )}
      <StyledPriceSurfaceRow>
        <StyledText>Total due today</StyledText>
        <StyledText>{totalDueToday_DISPLAY_ONLY}</StyledText>
      </StyledPriceSurfaceRow>
    </SubDetailsContainer>
  );
};

// NOTE: These values are for display purposes only - see above jsdoc for <SubCostDetails />.
const SUB_DICT_DISPLAY_PARAMS: Record<
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
      price: 5,
      billingPeriod: "month"
    }
  },
  MONTHLY: {
    label: "Monthly Subscription",
    price: 5,
    billingPeriod: "month"
  },
  ANNUAL: {
    label: "Annual Subscription",
    price: 50,
    billingPeriod: "year"
  }
};

/**
 * This calculates values for display purposes only.
 * - See above jsdoc for <SubCostDetails />.
 */
const getTotal_DISPLAY_ONLY = (price: number, promoCode: string | null) => {
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

const SubDetailsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledTextSpan = styled.span`
  width: 100%;
  display: inline-block;
  white-space: pre;
`;

// exported for use in PromoCodeInput
export const StyledText = styled(Text)`
  font-size: 1.15rem;
  line-height: 1.5rem;
`;

const StyledPriceInfoBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  white-space: pre;
`;

const StyledPriceSurface = styled.div`
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const StyledPriceSurfaceRow = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
