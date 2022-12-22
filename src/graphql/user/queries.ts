import { gql } from "@apollo/client";
import { ProfileFields } from "../profile/fragments";
import { StripeConnectAccountFields } from "../stripeConnectAccount/fragments";

export const USER_AUTH_TOKEN_FIELDS = gql`
  query UserAuthTokenFields {
    user {
      id
      handle
      email
      phone
      stripeCustomerID
      profile {
        ...ProfileFields
      }
      stripeConnectAccount {
        ...StripeConnectAccountFields
      }
      subscription {
        id
        status
        currentPeriodEnd
      }
    }
  }
  ${ProfileFields}
  ${StripeConnectAccountFields}
`;
