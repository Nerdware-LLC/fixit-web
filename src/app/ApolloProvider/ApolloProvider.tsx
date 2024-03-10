import { ApolloProvider as BaseApolloProvider } from "@apollo/client/react/context";
import { apolloClient } from "./apolloClient";

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => (
  <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>
);
