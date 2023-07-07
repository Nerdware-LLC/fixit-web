import { persistCache } from "apollo3-cache-persist";
import { apolloCache } from "./apolloCache";

export const persistCacheAsync = async () => {
  await persistCache({
    cache: apolloCache,
    storage: localStorage,
  });
};
