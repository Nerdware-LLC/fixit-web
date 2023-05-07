import { ApolloClient } from "@apollo/client/core";
import pkgJson from "@ROOT/package.json";
import { apolloCache } from "./apolloCache";
import { apolloLink } from "./apolloLink";

export const apolloClient = new ApolloClient({
  name: "fixit-web",
  ...(!!pkgJson?.version && { version: pkgJson.version }),
  cache: apolloCache,
  link: apolloLink,
  connectToDevTools: process.env.NODE_ENV !== "production",
});
