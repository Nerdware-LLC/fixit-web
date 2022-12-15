import { InMemoryCache } from "@apollo/client/cache";
import { typePolicies } from "./typePolicies";

export const apolloCache = new InMemoryCache({
  typePolicies,
  possibleTypes: {
    FixitUser: ["Contact", "User"]
  }
});
