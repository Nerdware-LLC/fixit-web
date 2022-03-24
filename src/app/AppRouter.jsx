import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ENV } from "../config";
import { WebViewContainer, Loading } from "../components";

const DevNavMenu = lazy(() => import("../pages/DevNavMenu"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const ConnectBridge = lazy(() => import("../pages/StripeConnectBridge"));
const CustomerPortalBridge = lazy(() =>
  import("../pages/StripeCustomerPortalBridge")
);

export const AppRouter = () => (
  <BrowserRouter basename={ENV.ROUTER_PATH_BASE}>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<WebViewContainer />}>
          {!ENV.IS_PROD_ENV && <Route index element={<DevNavMenu />} />}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/connect/:redirectType" element={<ConnectBridge />} />
          <Route path="/customer-portal" element={<CustomerPortalBridge />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);
