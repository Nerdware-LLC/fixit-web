import { ApolloClient } from "@apollo/client/core";
import { apolloLink } from "./apolloLink";
import { apolloCache } from "./apolloCache";
import { ENV } from "@config";
import pkgJson from "@ROOT/package.json";

export const apolloClient = new ApolloClient({
  name: "fixit-web",
  ...(!!pkgJson?.version && { version: pkgJson.version }),
  cache: apolloCache,
  link: apolloLink,
  connectToDevTools: !ENV.IS_PROD
});
