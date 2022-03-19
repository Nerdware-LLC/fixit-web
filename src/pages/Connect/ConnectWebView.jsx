import React from "react";
import { useRouteMatch, useParams, Switch, Route } from "react-router-dom";
import {
  useWebViewContext,
  WebViewPageContainer,
  Loading
} from "../../components";

const LoadingDisplay = () => {
  const { webViewPostMessage } = useWebViewContext();
  const { redirectType } = useParams();

  const message = redirectType
    ? { type: redirectType }
    : { error: "ConnectWebView did not receive the redirect type" };
  webViewPostMessage(message);

  return (
    <WebViewPageContainer>
      <Loading />
    </WebViewPageContainer>
  );
};

export const ConnectWebView = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:redirectType`}>
        <LoadingDisplay />
      </Route>
    </Switch>
  );
};
