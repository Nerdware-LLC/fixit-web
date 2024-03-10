import { InMemoryCache } from "@apollo/client/cache";
import { ENV } from "@/app/env";
import { queryTypePolicies } from "./typePolicies";

export const apolloCache = new InMemoryCache({
  typePolicies: {
    ...queryTypePolicies,
  },
  possibleTypes: {
    FixitUser: ["Contact", "User"],
  },
});

// In staging and production, enable cache persistance in localStorage.
if (/^(prod|staging)/i.test(ENV.MODE) && !ENV.IS_STORYBOOK) {
  const { persistCache } = await import("apollo3-cache-persist");

  await persistCache({
    cache: apolloCache,
    storage: localStorage,
  });
}
