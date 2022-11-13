import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckoutContext, type CheckoutContextValues } from "./CheckoutContext";
import { useWebViewContext, Loading } from "../../components";
import { CONSTANTS } from "../../types";
import { useQueryParams, useAuthToken } from "../../hooks";
import { storage, typeSafePropertyExists } from "../../utils";

export const CheckoutContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [checkoutValues, setCheckoutValues] = useState<CheckoutContextValues>();

  // For mobile context:
  const { isAppWithinWebView, webViewPostMessage } = useWebViewContext();
  const queryParamsFromMobile = useQueryParams();
  // For non-mobile context:
  const { state: locationState } = useLocation();
  const { processAuthToken } = useAuthToken();
  const nav = useNavigate();

  /* Checkout values will either come from queryParams if used within a
  mobile webview, or location.state if used in a non-mobile context.

  Once CheckoutForm submits the payment info, it passes the updated authToken
  into the `handlePostSubmit` fn. If this is operating within a mobile webview,
  that token is sent back to the mobile app via the `webViewPostMessage` fn; if
  not, the token is submitted for processing so the user's auth/payment info can
  be updated in the local cache.  */

  useEffect(() => {
    if (isAppWithinWebView) {
      // IF MOBILE:
      if (!areInitialCheckoutContextValuesValid(queryParamsFromMobile)) {
        webViewPostMessage({ error: "INVALID_QUERY_PARAMS" });
      } else {
        storage.setAuthToken(queryParamsFromMobile.token);
        setCheckoutValues({
          selectedSubscription: queryParamsFromMobile.sub.toUpperCase(),
          promoCode: queryParamsFromMobile?.promoCode ?? null,
          handlePostSubmit: webViewPostMessage
        } as CheckoutContextValues);
      }
    } else {
      // ELSE NON-MOBILE:
      if (!locationState || !areInitialCheckoutContextValuesValid(locationState)) {
        nav("/products", { replace: true, state: { isRedirect: true } });
      } else {
        setCheckoutValues({
          selectedSubscription: locationState.sub.toUpperCase(),
          promoCode: locationState?.promoCode ?? null,
          handlePostSubmit: ({ token: updatedAuthToken }) => {
            processAuthToken(updatedAuthToken).then(() => nav("/home"));
          }
        } as CheckoutContextValues);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !checkoutValues ? (
    <Loading />
  ) : (
    <CheckoutContext.Provider value={checkoutValues}>{children}</CheckoutContext.Provider>
  );
};

const areInitialCheckoutContextValuesValid = (obj: Record<string, any>) => {
  // prettier-ignore
  return (
    typeSafePropertyExists(obj, "sub")
    && CONSTANTS.USER_SUBSCRIPTION.PRICE_LABELS.includes(obj.sub)
    && typeSafePropertyExists(obj, "promoCode")
    && (typeof obj.promoCode === "string" || obj.promoCode === null)
  );
};
