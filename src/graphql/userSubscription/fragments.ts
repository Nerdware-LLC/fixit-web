import { gql } from "@apollo/client";

export const UserSubscriptionFields = gql`
  fragment UserSubscriptionFields on UserSubscription {
    id
    status
    currentPeriodEnd
    productID
    priceID
    createdAt
  }
`;

export const UserSubscriptionAuthTokenFields = gql`
  fragment UserSubscriptionAuthTokenFields on UserSubscription {
    id
    status
    currentPeriodEnd
  }
`;
