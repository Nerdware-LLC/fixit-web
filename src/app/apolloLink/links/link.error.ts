import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";
import stripAnsi from "strip-ansi";
import { logger, storage } from "@utils";
import { isAuthenticatedStore, isActiveAccountStore, isConnectOnboardingNeededStore } from "@cache";
import type { GraphQLErrorExtensions } from "graphql";

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  /* Error info may be obtained from either graphQLErrors or networkError
  depending on the nature of the error and/or how the error is returned from
  the API. Although error-handling is standardized on the backend, both bases
  are covered in this link so as to not make assumptions about the response
  that make this handler brittle and prone to breakage should something change
  in the future. Both params are checked, and both use the same handlers - to
  ensure this does not result in duplicate toast msgs being displayed to the
  user, each toast call uses the "toastId" param which ensures uniqueness. */

  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      logger.gqlError(
        [
          "[GraphQL Error]",
          `Status Code: ${stripAnsi(error.extensions.code as any)}`,
          `Message:     ${stripAnsi(error.message)}`
        ].join("\n\t")
      );

      const { extensions } = error;

      if (extensions.code === "BAD_USER_INPUT") handle400(extensions);
      else if (extensions.code === "UNAUTHENTICATED") handle401();
    });
  }

  if (networkError) {
    logger.gqlError(`Network Error: ${networkError.message}`);

    const { statusCode } = networkError as { statusCode?: number };

    // If !!networkError but no statusCode, show network error msg
    if (!statusCode) {
      toast.error("A network error occurred - please check your connection and try again.", {
        toastId: "network-error"
      });
    } else {
      // If !!statusCode, run the code's associated handler
      if (statusCode === 400) handle400();
      else if (statusCode === 401) handle401();
      else handle500orUnknown();
    }
  }
});

////////////////////////////////////////////////////////////////
// ERROR-LINK STATUS CODE HANDLERS:

const handle400 = (extensions?: GraphQLErrorExtensions) => {
  // Check for "invalidArgs" (key provided via GqlUserInputError in fixit-api)
  const errMsgSuffix =
    extensions && Array.isArray(extensions?.invalidArgs) && extensions.invalidArgs.length > 0
      ? [
          "Invalid values were provided for the fields listed below - please upade your input and try again.",
          ...extensions.invalidArgs
        ].join("\n\t • ")
      : "Invalid input provided - please upade your input and try again.";

  toast.error(`Whoops! ${errMsgSuffix}`, { toastId: "bad-user-input" });
};

const handle401 = () => {
  // Token is expired. Delete token, reset cache.
  storage.removeAuthToken();
  isAuthenticatedStore.set(false);
  isActiveAccountStore.set(false);
  isConnectOnboardingNeededStore.set(false);
  toast.info("Login has expired - please sign in again.", {
    toastId: "unauthenticated-please-login-again"
  });
  // Nav to login page (window-API used since Apollo operates outside of the RRD router context)
  window.location.replace(`${window.location.origin}/login`);
};

const handle500orUnknown = () => {
  toast.error("Whoops! An unexpected error occurred - please try again later.", {
    toastId: "unexpected-error-try-again-later"
  });
};
