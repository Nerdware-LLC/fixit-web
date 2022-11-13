import { gql } from "@apollo/client";

export const StripeConnectAccountFields = gql`
  fragment StripeConnectAccountFields on StripeConnectAccount {
    id
    detailsSubmitted
    chargesEnabled
    payoutsEnabled
  }
`;
