import { InMemoryCache } from "@apollo/client/cache";
import { queryTypePolicies } from "./typePolicies";

export const apolloCache = new InMemoryCache({
  typePolicies: {
    ...queryTypePolicies,
  },
  possibleTypes: {
    FixitUser: ["Contact", "User"],
  },
});
