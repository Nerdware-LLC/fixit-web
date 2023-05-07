import { createContext } from "react";
import { logger } from "@utils/logger";

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
  },
});
