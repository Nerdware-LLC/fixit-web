import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { useCheckoutContext } from "./CheckoutContext";
import { Title, Text } from "../../components";
import { ENV } from "../../config";

export const ExplainerText = () => {
  const { selectedSubscription: sub, promoCode } = useCheckoutContext();
  const { palette } = useTheme();

  const subUpper = sub.toUpperCase() as typeof sub;

  const isNotBeingCharged = subUpper === "TRIAL" || promoCode === ENV.STRIPE.VIP_PROMO_CODE;

  const subStartCondition = isNotBeingCharged
    ? "a valid payment method is placed on file."
    : "your payment is submitted.";

  const billingInfo = BILLING_INFO[subUpper];

  return (
    <StyledTitleBox>
      <StyledLargeText>Enter your card details.</StyledLargeText>
      <StyledLargeText style={{ marginTop: "0.5rem" }}>
        Your subscription will begin as soon as {subStartCondition}
      </StyledLargeText>
      <StyledUL
        style={{ color: (palette.text as typeof palette.text & { hint: string }).hint }}
        // The above text color uses custom added color-prop "hint", hence the `as ...`.
      >
        <li>
          <Text>{billingInfo}</Text>
        </li>
        <li style={{ margin: "0.5rem 0" }}>
          <Text>You can change or cancel your subscription at any time.</Text>
        </li>
        <li>
          <Text style={{}}>
            You&apos;ll receive a confirmation email {!isNotBeingCharged && "with receipt "}upon
            completion, as well as regular emails regarding account updates and other Fixit updates.
          </Text>
        </li>
      </StyledUL>
    </StyledTitleBox>
  );
};

const BILLING_INFO = {
  TRIAL:
    "Billing will begin at the end of your trial period, and occur monthly around the same day each month thereafter.",
  MONTHLY: "Billing will occur automatically around the same day each month.",
  ANNUAL: "Billing will occur automatically around the same day each year."
};

const StyledLargeText = styled(Title)`
  font-size: 1.25rem;
  line-height: 1.35rem;
`;

const StyledUL = styled.ul`
  margin: 0.75rem 0 0 0;
  padding: 0 0 0 1rem;
  font-size: 0.95rem;
`;

const StyledTitleBox = styled.div`
  box-sizing: border-box;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 1rem;
`;