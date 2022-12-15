import styled from "@emotion/styled";
import { StripeContextProvider } from "./StripeContextProvider";
import { StripeFormChild } from "./StripeFormChild";
import { FetchStateContextWrapper } from "../Indicators";
import { Text } from "../Typography";
import { func, string } from "@types";

export const StripeForm = ({
  handleSubmit,
  formSubmissionTermsText,
  ...props
}: React.ComponentProps<typeof StripeFormChild> & { formSubmissionTermsText: string }) => (
  <StripeContextProvider>
    <FetchStateContextWrapper>
      <StripeFormChild handleSubmit={handleSubmit} {...props} />
      <StyledText>{formSubmissionTermsText}</StyledText>
    </FetchStateContextWrapper>
  </StripeContextProvider>
);

const StyledText = styled(Text)`
  text-align: center;
  margin: 0.5rem;
  font-weight: 100;
  font-size: 0.7rem;
  line-height: 1rem;
  opacity: 0.75;
`;

StripeForm.propTypes = {
  handleSubmit: func.isRequired,
  className: string
};
