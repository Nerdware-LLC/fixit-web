import { ApolloClient } from "@apollo/client/core";
import { ENV } from "@/app/env";
import { apolloCache } from "./apolloCache";
import { apolloLink } from "./apolloLink";

export const apolloClient = new ApolloClient({
  name: "fixit-web",
  ...(!!ENV?.PROJECT_VERSION && { version: ENV.PROJECT_VERSION }),
  cache: apolloCache,
  link: apolloLink,
  connectToDevTools: !ENV.IS_PROD,
  // TODO - experiment with setting `assumeImmutableResults` to `true` (apollo says it's faster)
});
