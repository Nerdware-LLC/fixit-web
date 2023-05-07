import { useState } from "react";
import { logger } from "@utils/logger";
import { typeSafePropertyExists } from "@utils/typeSafety";
import { WebViewContext } from "./WebViewContext";

/**
 * When Fixit is rendered as a webview by the Fixit mobile app, a property called
 * `ReactNativeWebView` is attached to the global `window` object. This component
 * provides a context which contains (1) a boolean indicator for whether the app
 * is running within a mobile WebView, and (2) a function which when called sends
 * data back to the mobile application IF isAppWithinWebView is true, and if false
 * logs an error message in non-prod envs.
 */
export const WebViewContextProvider = ({ children }: WebViewContextProviderProps) => {
  const [isAppWithinWebView] = useState(() => {
    return (
      typeSafePropertyExists(window, "ReactNativeWebView") &&
      typeSafePropertyExists(window.ReactNativeWebView, "postMessage") &&
      typeof window.ReactNativeWebView.postMessage === "function"
    );
  });

  // window.ReactNativeWebView.postMessage only accepts one argument which must be a string.
  const webViewPostMessage = (input: unknown) => {
    const message = typeof input === "string" ? input : JSON.stringify(input);

    if (isAppWithinWebView === true) {
      window.ReactNativeWebView.postMessage(message);
    } else {
      // If not mobile in prod, log error.
      logger.error(
        `Method "window.ReactNativeWebView.postMessage" was called, but is not within a mobile WebView.
        INTENDED MESSAGE: ${message}`
      );
    }
  };

  return (
    <WebViewContext.Provider value={{ isAppWithinWebView, webViewPostMessage }}>
      {children}
    </WebViewContext.Provider>
  );
};

export type WebViewContextProviderProps = { children: React.ReactNode };
