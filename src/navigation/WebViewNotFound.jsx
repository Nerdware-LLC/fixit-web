import React from "react";
import { Route, Redirect } from "react-router-dom";
import { NotFound } from "../components/NotFound";
import { useWebViewContext, WebViewPageContainer } from "../components/WebView";

export const WebViewNotFound = () => {
  const { webViewPostMessage } = useWebViewContext();
  const exitWebViewWithError = () => {
    webViewPostMessage({ error: "INVALID_ROUTE" });
  };

  return (
    <>
      <Route path="/assets/not-found">
        <WebViewPageContainer>
          <NotFound handleClick={exitWebViewWithError} />
        </WebViewPageContainer>
      </Route>
      <Redirect to={{ pathname: "/assets/not-found" }} />
    </>
  );
};
