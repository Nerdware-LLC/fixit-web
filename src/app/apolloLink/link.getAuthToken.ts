import { setContext } from "@apollo/client/link/context";
import { storage } from "@utils/storage";

export const getAuthTokenLink = setContext(async (request, previousContext) => {
  const token = storage.authToken.get();
  const { headers } = previousContext;
  return {
    headers: {
      ...headers,
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
  };
});
