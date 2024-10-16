import { InMemoryCache } from "@apollo/client/cache";
import { ENV } from "@/app/env";
import { typePolicies } from "./typePolicies";

export const apolloCache = new InMemoryCache({
  addTypename: true, // Automatically add `__typename` to all queried fields
  typePolicies,
  possibleTypes: {
    PublicUserFields: ["Contact", "User"],
  },
});

// In staging and production, enable cache persistance in localStorage
if (ENV.IS_DEPLOYED_ENV && !ENV.IS_STORYBOOK) {
  const { persistCache } = await import("apollo3-cache-persist");

  await persistCache({
    cache: apolloCache,
    storage: localStorage,
  });
}
