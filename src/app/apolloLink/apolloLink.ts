import { ApolloLink } from "@apollo/client/link/core";
import { apiHttpLink } from "./link.apiHttp";
import { errorLink } from "./link.error";
import { getAuthTokenLink } from "./link.getAuthToken";
import { retryLink } from "./link.retry";

/**
 * This is the Apollo Link that is used to make all requests to the server.
 *
 * **Link Process Outline:** `(1, 2, 3, 4, 5 => SERVER => 5, 4, 3, 2, 1)`
 *
 * **Links:**
 *
 *    1. loggerLink
 *       - Only imported and used in dev mode
 *       - Logs all requests and responses
 *
 *    2. getAuthTokenLink
 *       - Sets Authorization header (value will be null if !token)
 *
 *    3. retryLink
 *       - Catches and retries _NETWORK_ errors
 *       - _Does not catch/retry GraphQL errors_
 *
 *    4. errorLink
 *       - Logs network errors _AND_ GraphQL errors
 *       - Catches and retries _GraphQL_ errors
 *       - When AuthenticationError is thrown on the server, that comes back as a
 *         _GraphQL_ error which can not be caught by the `retryLink`, so this link
 *         handles sending the retry-request to the `/auth/token` endpoint.
 *
 *    5. apiHttpLink
 *       - Sends request to the `/api` endpoint
 */
export const apolloLink = ApolloLink.from([
  // if needed, loggerLink goes here
  getAuthTokenLink,
  retryLink,
  errorLink,
  apiHttpLink,
]);
