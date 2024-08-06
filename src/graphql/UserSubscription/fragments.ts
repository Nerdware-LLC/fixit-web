import { gql } from "@/types/__codegen__/gql.js";

export const UserSubscriptionFields = gql(`
  fragment UserSubscriptionFields on UserSubscription {
    id
    status
    currentPeriodEnd
    productID
    priceID
    createdAt
  }
`);
