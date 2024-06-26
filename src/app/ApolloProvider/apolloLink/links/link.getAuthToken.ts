import { setContext } from "@apollo/client/link/context";
import { authTokenLocalStorage } from "@/stores/authenticatedUserStore.js";

/**
 * **Apollo Link: getAuthToken** - Sets Authorization header
 */
export const getAuthTokenLink = setContext((_request, previousContext) => {
  const token = authTokenLocalStorage.get();
  const { headers } = previousContext as { headers: Record<string, string> };
  return {
    headers: {
      ...headers,
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
  };
});
