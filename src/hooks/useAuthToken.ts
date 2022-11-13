import jwtDecode from "jwt-decode";
import { useApolloClient } from "@apollo/client/react/hooks";
import { QUERIES } from "../graphql";
import { storage } from "../utils/storage";
import type { EncodedAuthToken, AuthTokenPayload } from "../types";
import {
  tokenFieldsStore,
  isAuthenticatedStore,
  isActiveAccountStore,
  isConnectOnboardingNeededStore
} from "../app/apolloCache";

export const useAuthToken = () => {
  const client = useApolloClient();

  const processAuthToken = async (token: EncodedAuthToken): Promise<AuthTokenPayload> => {
    console.debug(`[processAuthToken] token = ${JSON.stringify(token, null, 2)}`);
    storage.setAuthToken(token);

    const tokenPayload: AuthTokenPayload = jwtDecode(token);
    console.debug(`[processAuthToken] tokenPayload = ${JSON.stringify(tokenPayload, null, 2)}`);

    tokenFieldsStore.set(tokenPayload);

    // prettier-ignore
    const {
      id,
      email,
      phone,
      stripeCustomerID,
      stripeConnectAccount,
      subscription
    } = tokenPayload;

    if (!stripeConnectAccount.detailsSubmitted) {
      isConnectOnboardingNeededStore.set(true);
    }

    if (subscription) {
      isActiveAccountStore.setIsSubValid(subscription);
    }

    client.writeQuery({
      query: QUERIES.USER_AUTH_TOKEN_FIELDS,
      data: {
        user: {
          __typename: "User",
          id,
          email,
          phone,
          stripeCustomerID,
          stripeConnectAccount: {
            __typename: "StripeConnectAccount",
            ...stripeConnectAccount
          },
          subscription: subscription
            ? {
                __typename: "Subscription",
                ...subscription
              }
            : null
        }
      }
    });

    isAuthenticatedStore.set(true);

    return tokenPayload;
  };

  const removeAuthToken = async () => {
    client.stop();
    storage.removeAuthToken();
    await client.clearStore();
    isAuthenticatedStore.set(false);
    isActiveAccountStore.set(false);
    isConnectOnboardingNeededStore.set(false);
  };

  return {
    processAuthToken,
    removeAuthToken
  };
};