import React, { useEffect } from "react";
import { CheckoutContext } from "./CheckoutContext";
import { HeaderIcon } from "./HeaderIcon";
import { ExplainerText } from "./ExplainerText";
import { SubCostDetails } from "./SubCostDetails";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutStripeBadge } from "./CheckoutStripeBadge";
import {
  useWebViewContext,
  WebViewPageContainer,
  WebViewContentContainer
} from "../../components";
import { storage, useQueryParams } from "../../utils";

export const CheckoutWebView = () => {
  const { token, sub, promoCode } = useQueryParams();
  const { webViewPostMessage } = useWebViewContext();

  useEffect(() => {
    storage.setAuthToken(token);
  }, [token]);

  if (!token || !sub) webViewPostMessage({ error: "INVALID_QUERY_PARAMS" });

  return (
    <WebViewPageContainer>
      <CheckoutContext.Provider
        value={{
          selectedSubscription: sub.toUpperCase(),
          promoCode,
          handlePostSubmit: webViewPostMessage
        }}
      >
        <WebViewContentContainer>
          <HeaderIcon />
          <ExplainerText />
          <SubCostDetails />
          <CheckoutForm />
          <CheckoutStripeBadge />
        </WebViewContentContainer>
      </CheckoutContext.Provider>
    </WebViewPageContainer>
  );
};
