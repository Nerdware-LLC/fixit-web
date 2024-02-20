import { ApolloClient } from "@apollo/client/core";
import { ENV } from "@/app/env";
import { apolloLink } from "./apolloLink";
import { apolloCache } from "./apolloCache";

export const apolloClient = new ApolloClient({
  name: "fixit-web",
  ...(!!ENV?.PROJECT_VERSION && { version: ENV.PROJECT_VERSION }),
  cache: apolloCache,
  link: apolloLink,
  connectToDevTools: ENV.IS_DEV,
});
