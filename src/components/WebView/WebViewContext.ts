import { createContext, useContext } from "react";
import { logger } from "../../utils";

export const WebViewContext = createContext<{
  isAppWithinWebView: boolean;
  webViewPostMessage: (input: unknown) => void;
}>({
  isAppWithinWebView: false,
  webViewPostMessage: (input: unknown) => {
    const message = typeof input === "string" ? input : JSON.stringify(input);

    logger.error(
      `Method "window.ReactNativeWebView.postMessage" was called with the initial-context placeholder function.
      INTENDED MESSAGE: ${message}`
    );
  }
});

export const useWebViewContext = () => useContext(WebViewContext);
