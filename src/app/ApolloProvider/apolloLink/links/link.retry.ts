import { RetryLink } from "@apollo/client/link/retry";

/**
 * **Apollo Link: {@link RetryLink}** - Catches and retries NETWORK errors
 *
 * > Note:
 * > - _This link does not catch/retry GraphQL errors_.
 * > - Currently this link reflects the default configs for RetryLink.
 */
export const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => {
      // Don't retry if token gets rejected
      return error?.result?.errors?.some(
        (errorObj?: { extensions?: { code?: string } }) =>
          errorObj?.extensions?.code === "UNAUTHENTICATED"
      )
        ? false
        : true;
    },
  },
});
