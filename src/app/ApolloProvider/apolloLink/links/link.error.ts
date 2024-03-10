import { toast } from "react-toastify";
import { onError } from "@apollo/client/link/error";
import { isString } from "@nerdware/ts-type-safety-utils";
import stripAnsi from "strip-ansi";
import { authenticatedUserStore } from "@/stores";
import { logger } from "@/utils/logger";
import type { GraphQLErrorExtensions } from "graphql";

/**
 * **Apollo Link: error handler** - Handles errors returned from the Fixit GraphQL API
 *
 * Error info may be obtained from either graphQLErrors or networkError depending on the nature of
 * the error and/or how the error is returned from the API. Although error-handling is standardized
 * on the backend, both bases are covered in this link so as to not make assumptions about the
 * response that make this handler brittle and prone to breakage should something change in the
 * future. Both params are checked, and both use the same handlers - to ensure this does not result
 * in duplicate toast msgs being displayed to the user, each toast call uses the "toastId" param
 * which ensures uniqueness.
 */
export const errorLink = onError(({ graphQLErrors, networkError }) => {
  // Check both params for errors, start with graphQLErrors:
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      const { message: errorMessage, extensions } = error;

      logger.gqlError(
        [
          "[GraphQL Error]",
          `Status Code: ${isString(extensions?.code) ? stripAnsi(extensions.code) : "unknown"}`,
          `Message:     ${stripAnsi(errorMessage)}`,
        ].join(`\n\t`)
      );

      if (extensions.code === "BAD_USER_INPUT") gqlErrorHandlers[400](extensions);
      else if (extensions.code === "UNAUTHENTICATED") gqlErrorHandlers[401]();
    });
  }

  if (networkError) {
    logger.gqlError(`Network Error: ${networkError.message}`);

    const { statusCode } = networkError as { statusCode?: number };

    // If !!networkError but no statusCode, show network error msg
    if (!statusCode) {
      toast.error("A network error occurred — please check your connection and try again.", {
        toastId: "network-error",
      });
    } else {
      // If !!statusCode, run the code's associated handler (or default to 500 handler if not defined)
      const handleGqlError =
        gqlErrorHandlers?.[statusCode as keyof typeof gqlErrorHandlers] ?? gqlErrorHandlers[500];

      handleGqlError();
    }
  }
});

////////////////////////////////////////////////////////////////
// ERROR-LINK STATUS CODE HANDLERS:

/**
 * This interface extends the {@link GraphQLErrorExtensions} interface from the `graphql` package
 * to add properties that are added by the fixit-api.
 */
interface FixitApiGraphQLErrorExtensions extends GraphQLErrorExtensions {
  /** Used to indicate which args were invalid in a GQLUserInputError (http 400). */
  invalidArgs?: string[];
}

/**
 * GraphQL HTTP error handlers by status
 */
const gqlErrorHandlers = {
  /** 400 — Bad user input */
  400: (extensions: FixitApiGraphQLErrorExtensions = {}) => {
    // Check for "invalidArgs" (key provided via GqlUserInputError in fixit-api)
    const { invalidArgs = [] } = extensions;

    const errMsgSuffix =
      Array.isArray(invalidArgs) &&
      invalidArgs.length > 0 &&
      invalidArgs.every((arg) => isString(arg))
        ? [
            "Invalid values were provided for the fields listed below - please update your input and try again.",
            ...invalidArgs,
          ].join("\n\t • ")
        : "Invalid input provided - please upade your input and try again.";

    toast.error(`Whoops! ${errMsgSuffix}`, { toastId: "bad-user-input" });
  },
  /** 401 — Authentication required */
  401: () => {
    // Token is expired, run deauth logic:
    authenticatedUserStore.deauthenticate();
    toast.info("Login has expired — please sign in again.", { toastId: "expired-login" });
    // Nav to login page (window-API used since Apollo operates outside of the RRD router context)
    window.location.replace(`${window.location.origin}/login`);
  },
  /** 402 — Payment required */
  402: () => {
    toast.info(
      "Sorry, your subscription has expired — please update your payment settings and try again.",
      { toastId: "expired-sub" }
    );
  },
  /** 403 — Forbidden */
  403: () => {
    toast.error("Sorry, you do not have the required permissions to perform this action.", {
      toastId: "forbidden",
    });
  },
  /** 500/unknown — Internal server error */
  500: () => {
    toast.error("Whoops! An unexpected error occurred — please try again later.", {
      toastId: "unexpected-error-try-again-later",
    });
  },
} as const satisfies Record<number, (extensions?: FixitApiGraphQLErrorExtensions) => void>;
