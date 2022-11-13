import React, { useEffect } from "react";
import { useAuthToken } from "../hooks";
import { authService } from "../services";
import { storage } from "../utils";

export const AuthStateInitLayer = ({ children }: { children: React.ReactElement }) => {
  const { processAuthToken, removeAuthToken } = useAuthToken();

  // INITIALIZE STATE: AuthToken + PushToken
  useEffect(() => {
    (async () => {
      const authToken = storage.getAuthToken();
      if (authToken) {
        try {
          // If necessary, authService will include the expoPushToken in req.body
          const { token } = await authService.refreshAuthToken();
          if (token) await processAuthToken(token);
          else await removeAuthToken();
        } catch {
          await removeAuthToken();
        }
      }
    })();
  }, [processAuthToken, removeAuthToken]);

  return children;
};
