import { gql } from "@/types/__codegen__/gql.js";

export const StripeConnectAccountFields = gql(`
  fragment StripeConnectAccountFields on UserStripeConnectAccount {
    id
    detailsSubmitted
    chargesEnabled
    payoutsEnabled
  }
`);
