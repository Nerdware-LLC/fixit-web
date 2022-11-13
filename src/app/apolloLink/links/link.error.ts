import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";
import stripAnsi from "strip-ansi";
import { logger, storage } from "../../../utils";
import type { GraphQLError } from "graphql";

const logGraphQLerror = (error: GraphQLError) => {
  logger.gqlError(`
[GraphQL ERROR LINK]: ${stripAnsi(error.extensions.code as any)}

${stripAnsi(error.message)}`);
};

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  toast("Whoops! An error occurred.");
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      logGraphQLerror(error);
      if (error.extensions.code === "UNAUTHENTICATED") {
        // Token is expired. Delete token, reset cache.
        storage.removeAuthToken();
        toast("Login has expired - please sign in again.");
      }
    });
  }

  if (networkError) {
    logger.gqlError(`Network Error: ${networkError.message}`);

    const { statusCode } = networkError as { statusCode?: number };

    if (statusCode) {
      if (statusCode === 400) {
        logger.gqlError("400: BAD REQUEST");
        toast("😕 An unexpected error occurred...");
      } else if (statusCode === 401) {
        storage.removeAuthToken();
        toast("Login has expired - please sign in again.");
      } else if (statusCode >= 500) {
        toast("SERVER ERROR");
      } else {
        toast("😕 An unexpected error occurred...");
      }
    }
  }
});
