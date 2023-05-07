import { gql } from "@graphql/__codegen__";

export const StripeConnectAccountFields = gql(`
  fragment StripeConnectAccountFields on UserStripeConnectAccount {
    id
    detailsSubmitted
    chargesEnabled
    payoutsEnabled
  }
`);
