import React from "react";
import { useParams } from "react-router-dom";
import { useWebViewContext, Loading } from "../../components";

export const StripeConnectBridge = () => {
  const { webViewPostMessage } = useWebViewContext();
  const { redirectType } = useParams();

  const message = redirectType
    ? { type: redirectType }
    : { error: "Connect WebView did not receive the redirect type" };
  webViewPostMessage(message);

  return <Loading />;
};

/* StripeConnectBridge:

This "page" simply serves as a bridge between the Stripe Connect user
onboarding flow and the Fixit client mobile app. It works as follows:

    (1) After the user completes the Stripe Connect onboarding flow,
        Stripe redirects the user here.
    (2) This "page" receives the "redirectType" URL query param, and
        then uses our React Native WebView method "webViewPostMessage"
        to communicate back to the client app.
*/
