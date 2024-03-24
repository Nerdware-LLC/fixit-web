import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { isFunction } from "@nerdware/ts-type-safety-utils";
import { ENV } from "@/app/env";

export interface GoogleOAuthContextProps {
  clientID: string;
  hasGoogleOAuthScriptLoadedSuccessfully: boolean;
}

export const GoogleOAuthContext = createContext<GoogleOAuthContextProps>({
  clientID: "",
  hasGoogleOAuthScriptLoadedSuccessfully: false,
});

export const useGoogleOAuthContext = () => useContext(GoogleOAuthContext);

export const GoogleOAuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasGoogleOAuthScriptLoadedSuccessfully, setHasGoogleOAuthScriptLoadedSuccessfully] =
    useState(false);

  /**
   * EFFECT: If GoogleOAuth SHOULD be enabled in the env, then ensure the Google OAuth
   * client lib script loaded successfully, and update the associated state variable.
   */
  useEffect(() => {
    /**
     * Only run hook logic if `GOOGLE_OAUTH_CLIENT_ID` is present and the necessary
     * script has not yet been confirmed to have successfully loaded.
     */
    if (ENV.GOOGLE_OAUTH_CLIENT_ID.length > 0 && !hasGoogleOAuthScriptLoadedSuccessfully) {
      // Async IIFE to run the google-lib-checking logic with a 1s interval:
      (async () => {
        // Array to hold any setTimeout timerIDs used in the retry logic:
        const timeoutTimerIDs: NodeJS.Timeout[] = [];
        // Make 3 attempts to check if the google lib has loaded successfully:
        for (let i = 0; i < 3; i++) {
          if (hasGoogleOAuthScriptLoadedSuccessfully) break;

          if (isFunction(window.google?.accounts?.id?.initialize)) {
            setHasGoogleOAuthScriptLoadedSuccessfully(true);
          } else {
            // Else wait 1s, add the timerID to the array, and try again
            const timeoutTimerID = await new Promise<NodeJS.Timeout>((resolve) =>
              setTimeout(resolve, 1000)
            );

            timeoutTimerIDs.push(timeoutTimerID);
          }
        }
        // Ensure any timers that had to be set are cleared:
        if (timeoutTimerIDs.length > 0) {
          timeoutTimerIDs.forEach((timerID) => clearTimeout(timerID));
        }
      })();
    }
  }, [hasGoogleOAuthScriptLoadedSuccessfully]);

  const contextValues = useMemo(
    () => ({
      clientID: ENV.GOOGLE_OAUTH_CLIENT_ID,
      hasGoogleOAuthScriptLoadedSuccessfully,
    }),
    [hasGoogleOAuthScriptLoadedSuccessfully]
  );

  return (
    <GoogleOAuthContext.Provider value={contextValues}>{children}</GoogleOAuthContext.Provider>
  );
};
