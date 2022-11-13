import React, { useState } from "react";
import { WebViewContext } from "./WebViewContext";
import { logger, typeSafePropertyExists } from "../../utils";

export const WebViewContextProvider = ({ children }: { children: React.ReactNode }) => {
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
