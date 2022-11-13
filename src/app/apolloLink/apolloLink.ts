import { ApolloLink } from "@apollo/client/link/core";
import {
  apiHttpLink,
  errorLink,
  getAuthTokenLink,
  //   loggerLink,
  retryLink
} from "./links";

// TODO add apollo-link-rest and delete httpService & authService

export const apolloLink = ApolloLink.from([
  //   loggerLink,
  getAuthTokenLink,
  retryLink,
  errorLink,
  apiHttpLink
]);

/*
LINK PROCESS (1, 2, 3, 4, 5 => SERVER => 5, 4, 3, 2, 1)

1) loggerLink
      Gets called every time no matter what.
2) getAuthTokenLink
      Sets Authorization header; value will be null if !token.
3) retryLink
      CAN ONLY CATCH NETWORK ERRORS, NOT GraphQL ERRORS!
4) errorLink
      Logs errors AND MOST IMPORTANTLY, GraphQL Errors can only be caught here!
      errorLink CAN ALSO RETRY REQUESTS! When AuthenticationError is thrown on
      the server, that comes back as a GraphQL error that can ONLY be caught here!
      So it is HERE that we make the switch to retry and go to /auth/token.
5) authSplitterLink
      If operationName is Login/Register, go to restLink (/auth endpoint)
      Else go to apiHttpLink (/api endpoint)

*/
