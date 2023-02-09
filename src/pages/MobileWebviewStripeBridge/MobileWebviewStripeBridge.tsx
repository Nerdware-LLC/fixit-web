import { useParams } from "react-router-dom";
import { useWebViewContext } from "@app";
import { Loading } from "@components";

// TODO Once mobile app is ready, have a Route or some other comp render this where appropriate.

/**
 * This "page" simply serves as a bridge between the Stripe-provided portal pages
 * and the Fixit client mobile app. It works as follows:
 *
 * - For Stripe Customer Portal:
 *   1. When the user wants to navigate away from the Stripe-provided
 *      Customer Portal page, Stripe redirects the user here.
 *   2. This "page" uses our React Native WebView method
 *      "webViewPostMessage" to communicate back to the client app.
 *
 * <br/>
 *
 * - For Stripe Connect Onboarding and Dashboard:
 *   1. After the user completes the Stripe Connect onboarding flow, Stripe
 *      redirects the user here.
 *   2. This "page" receives the "redirectType" URL query param, and then
 *      uses our React Native WebView method "webViewPostMessage" to
 *      communicate back to the client app.
 */
export const MobileWebviewStripeBridge = () => {
  const { webViewPostMessage } = useWebViewContext();
  const queryParams = useParams();

  // If "redirectType" is present, purpose = Connect, else CustomerPortal
  const webviewMsgPayload =
    "redirectType" in queryParams
      ? ["return", "refresh"].includes(queryParams?.redirectType ?? "")
        ? { type: queryParams.redirectType }
        : { error: "Connect WebView did not receive the redirect type" }
      : { success: true };

  webViewPostMessage(webviewMsgPayload);

  return <Loading />;
};
