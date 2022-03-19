import React from "react";
import { WebViewContext } from "./WebViewContext";
import { element } from "../../types";

export const WebViewContextProvider = ({ children }) => {
  // window.ReactNativeWebView.postMessage only accepts one argument which must be a string.
  const webViewPostMessage = input => {
    const message = typeof input === "string" ? input : JSON.stringify(input);
    window.ReactNativeWebView.postMessage(message);
  };

  return (
    <WebViewContext.Provider value={{ webViewPostMessage }}>
      {children}
    </WebViewContext.Provider>
  );
};

WebViewContextProvider.propTypes = {
  children: element.isRequired
};
