import { RetryLink } from "@apollo/client/link/retry";

// NOTE this is just the default config

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
      // prettier-ignore
      return error?.result?.errors?.some(
        (errorObj?: { extensions?: { code?: string } }) => errorObj?.extensions?.code === "UNAUTHENTICATED"
      )
        ? false
        : true;
    },
  },
});
