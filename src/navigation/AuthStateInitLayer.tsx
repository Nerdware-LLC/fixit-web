import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "@hooks";
import { storage } from "@utils";

/**
 * This component checks the AuthToken when first rendered,
 * and redirects the user to /home if the token is valid.
 *
 * Since navigation is involved, this component must reside
 * within BrowserRouter in the component tree.
 */
export const AuthStateInitLayer = ({ children }: { children: React.ReactElement }) => {
  const { refreshAuthToken } = useAuthService();
  const nav = useNavigate();

  // INITIALIZE STATE: AuthToken
  useEffect(() => {
    (async () => {
      const authToken = storage.getAuthToken();
      if (authToken) {
        const { success } = await refreshAuthToken();
        if (success) nav("/home");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
