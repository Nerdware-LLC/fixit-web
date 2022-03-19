import React from "react";
import {
  useWebViewContext,
  WebViewPageContainer,
  Loading
} from "../../components";

export const CustomerPortalWebView = () => {
  const { webViewPostMessage } = useWebViewContext();
  webViewPostMessage({ success: true });

  return (
    <WebViewPageContainer>
      <Loading />
    </WebViewPageContainer>
  );
};
