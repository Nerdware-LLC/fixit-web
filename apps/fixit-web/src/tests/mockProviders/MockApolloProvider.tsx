import {
  MockedProvider as ApolloMockedProvider,
  type MockedProviderProps,
} from "@apollo/client/testing";
import { apolloCache } from "@/app/ApolloProvider/apolloCache";

export type MockApolloProviderProps = MockedProviderProps;

/**
 * MockApolloProvider is a wrapper for Apollo's {@link ApolloMockedProvider|MockedProvider}
 * that provides the app's {@link apolloCache} instance as the default for the `cache` prop.
 */
export const MockApolloProvider = ({
  cache = apolloCache,
  connectToDevTools = true,
  children,
  ...apolloMockedProviderProps
}: MockApolloProviderProps) => (
  <ApolloMockedProvider
    cache={cache}
    connectToDevTools={connectToDevTools}
    {...apolloMockedProviderProps}
  >
    {children}
  </ApolloMockedProvider>
);
