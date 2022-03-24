import { createContext, useContext } from "react";

export const WebViewContext = createContext({
  webViewPostMessage: () => {}
});

export const useWebViewContext = () => useContext(WebViewContext);
