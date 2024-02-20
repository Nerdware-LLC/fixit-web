import { gql } from "@/graphql/__codegen__";

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
