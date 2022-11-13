import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useCheckoutContext } from "./CheckoutContext";
import { Text } from "../../components";
import { ENV } from "../../config";
import { formatNum } from "../../utils";

// TODO fetch/validate promoCode via API or something

export const SubCostDetails = () => {
  const { selectedSubscription: sub, promoCode } = useCheckoutContext();

  const subUpper = sub.toUpperCase() as typeof sub;

  const planObj = PLAN_DICT[subUpper];
  const discountFactor = DISCOUNT_DICT?.[promoCode ?? ""] ?? null;
  const displayablePlanAmount = formatNum.toCurrencyStr(planObj.amount);

  const numDisplay = {
    planAmount: displayablePlanAmount,
    ...(discountFactor
      ? {
          discountPercentage: formatNum.toPercentageStr(discountFactor),
          totalAmount: formatNum.toCurrencyStr(planObj.amount + planObj.amount * discountFactor)
        }
      : {
          discountPercentage: null,
          totalAmount: displayablePlanAmount
        })
  };

  const cellStyles = {
    leftCol: { width: "75%", justifyContent: "flex-start" },
    rightCol: { width: "25%", justifyContent: "flex-end" }
  };

  return (
    <SubDetailsContainer>
      <Row>
        <Cell style={cellStyles.leftCol}>
          <StyledText>{planObj.label}</StyledText>
        </Cell>
        <Cell style={cellStyles.rightCol}>
          <StyledText>{numDisplay.planAmount}</StyledText>
        </Cell>
      </Row>
      {!!discountFactor && (
        <Row>
          <Cell style={cellStyles.leftCol}>
            <StyledText>Promo Code Applied</StyledText>
          </Cell>
          <Cell style={cellStyles.rightCol}>
            <StyledText>{numDisplay.discountPercentage}</StyledText>
          </Cell>
        </Row>
      )}
      <Row>
        <Cell style={cellStyles.leftCol}>
          <StyledText>Total</StyledText>
        </Cell>
        <Cell style={{ ...cellStyles.rightCol, borderTopWidth: "4px", borderTopStyle: "double" }}>
          <StyledText>{numDisplay.totalAmount}</StyledText>
        </Cell>
      </Row>
    </SubDetailsContainer>
  );
};

const PLAN_DICT = {
  TRIAL: {
    label: "14-Day Free Trial",
    amount: 0
  },
  MONTHLY: {
    label: "Monthly Plan",
    amount: 5
  },
  ANNUAL: {
    label: "Annual Plan",
    amount: 50
  }
};

const DISCOUNT_DICT = {
  [ENV.STRIPE.VIP_PROMO_CODE]: -1
};

const SubDetailsContainer = styled.div`
  width: 100%;
  align-self: center;
  display: flex;
  flex-direction: column;
`;

const borderColor = css`
  border-color: rgba(175, 175, 175, 0.5);
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${borderColor}
`;

const Cell = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  ${borderColor}
`;

const StyledText = styled(Text)`
  font-size: 1.15rem;
  line-height: 1.5rem;
`;
