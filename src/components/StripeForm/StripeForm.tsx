import React from "react";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { StripeContextProvider } from "./StripeContextProvider";
import { StripeFormChild, STRIPE_FORM_PROP_TYPES } from "./StripeFormChild";
import { FetchStateContextWrapper } from "../Indicators";
import { Text } from "../Typography";

export const StripeForm = ({
  handleSubmit,
  ...props
}: React.ComponentProps<typeof StripeFormChild>) => {
  const { palette } = useTheme();

  return (
    <StripeContextProvider>
      <FetchStateContextWrapper>
        <StripeFormChild handleSubmit={handleSubmit} {...props} />
        <StyledText>
          By confirming your subscription, you allow Fixit to charge your card for this payment and
          future payments in accordance with their terms. You can always cancel your subscription.
        </StyledText>
      </FetchStateContextWrapper>
    </StripeContextProvider>
  );
};

const StyledText = styled(Text)`
  text-align: center;
  margin-top: 0.7rem;
  font-weight: 100;
  font-size: 0.7rem;
  line-height: 1rem;
  opacity: 0.75;
`;

StripeForm.propTypes = STRIPE_FORM_PROP_TYPES;
