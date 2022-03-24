import React from "react";
import { useWebViewContext, Loading } from "../../components";

export const StripeCustomerPortalBridge = () => {
  const { webViewPostMessage } = useWebViewContext();
  webViewPostMessage({ success: true });

  return <Loading />;
};

/* StripeCustomerPortalBridge:

This "page" simply serves as a bridge between the Stripe-provided
Customer Portal and the Fixit client mobile app. It works as follows:

    (1) When the user wants to navigate away from the Stripe-provided
        Customer Portal page, Stripe redirects the user here.
    (2) This "page" uses our React Native WebView method
        "webViewPostMessage" to communicate back to the client app.
*/
