import { gql } from "@apollo/client";
import { ProfileFields } from "../profile/fragments";
import { StripeConnectAccountFields } from "../stripeConnectAccount/fragments";
import {
  UserSubscriptionFields,
  UserSubscriptionAuthTokenFields
} from "../userSubscription/fragments";

export const PublicUserFields = gql`
  fragment PublicUserFields on User {
    email
    phone
    profile {
      ...ProfileFields
    }
  }
  ${ProfileFields}
`;

export const PrivateUserFields = gql`
  fragment PrivateUserFields on User {
    id
    stripeCustomerID
    stripeConnectAccount {
      ...StripeConnectAccountFields
    }
    subscription {
      ...UserSubscriptionFields
    }
    ...PublicUserFields
    createdAt
  }
  ${StripeConnectAccountFields}
  ${UserSubscriptionFields}
  ${PublicUserFields}
`;

export const AuthTokenFields = gql`
  fragment AuthTokenFields on User {
    id
    email
    phone
    stripeCustomerID
    stripeConnectAccount {
      ...StripeConnectAccountFields
    }
    subscription {
      ...UserSubscriptionAuthTokenFields
    }
  }
  ${StripeConnectAccountFields}
  ${UserSubscriptionAuthTokenFields}
`;
