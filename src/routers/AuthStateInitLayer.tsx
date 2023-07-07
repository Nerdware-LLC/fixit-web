import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isActiveAccountStore } from "@cache/isActiveAccountStore";
import { useAuthService } from "@hooks/useAuthService";
import { storage } from "@utils/storage";

/**
 * This component checks the AuthToken when first rendered,
 * and redirects the user to /home if the token is valid.
 *
 * Since navigation is involved, this component must reside
 * within BrowserRouter in the component tree.
 */
export const AuthStateInitLayer = ({ children }: AuthStateInitLayerProps) => {
  const { refreshAuthToken } = useAuthService();
  const nav = useNavigate();

  // INITIALIZE STATE: AuthToken
  useEffect(() => {
    (async () => {
      const authToken = storage.authToken.get();
      if (authToken) {
        const { success } = await refreshAuthToken();

        // If auth token is good, check if account is active
        if (success) {
          const isActiveAccount = isActiveAccountStore.get();
          // If account is active, nav to /home, else nav to /products
          if (isActiveAccount) nav("/home");
          else nav("/products");
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export type AuthStateInitLayerProps = { children: React.ReactElement };
