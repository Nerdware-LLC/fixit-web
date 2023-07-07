import { ApolloClient } from "@apollo/client/core";
import pkgJson from "@ROOT/package.json";
import { ENV } from "@app/env";
import { apolloCache } from "./apolloCache";
import { apolloLink } from "./apolloLink";

export const apolloClient = new ApolloClient({
  name: "fixit-web",
  ...(!!pkgJson?.version && { version: pkgJson.version }),
  cache: apolloCache,
  link: apolloLink,
  connectToDevTools: ENV.IS_DEV,
});
