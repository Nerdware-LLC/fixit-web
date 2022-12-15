import { setContext } from "@apollo/client/link/context";
import { storage } from "@utils";

export const getAuthTokenLink = setContext(async (request, previousContext) => {
  const token = storage.getAuthToken();
  const { headers } = previousContext;
  return {
    headers: {
      ...headers,
      ...(!!token && { Authorization: `Bearer ${token}` })
    }
  };
});
