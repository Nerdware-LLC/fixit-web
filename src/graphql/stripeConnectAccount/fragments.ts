import { gql } from "@apollo/client";

export const StripeConnectAccountFields = gql`
  fragment StripeConnectAccountFields on UserStripeConnectAccount {
    id
    detailsSubmitted
    chargesEnabled
    payoutsEnabled
  }
`;
