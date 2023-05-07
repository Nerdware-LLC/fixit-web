import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Loading } from "@components/Indicators/Loading";
import { PageContainer } from "@layouts/PageContainer";
import { AuthStateInitLayer } from "./AuthStateInitLayer";
import { AuthProtectedRoute, PaymentProtectedRoute } from "./ProtectedRoutes";

const LandingPage = lazy(() => import(/* webpackChunkName: "LandingPage" */ "@pages/LandingPage")); // prettier-ignore
const RegisterPage = lazy(() => import(/* webpackChunkName: "RegisterPage" */ "@pages/RegisterPage")); // prettier-ignore
const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */ "@pages/LoginPage")); // prettier-ignore
const TermsOfServicePage = lazy(() => import(/* webpackChunkName: "TermsOfServicePage" */ "@pages/TermsOfServicePage")); // prettier-ignore
const PrivacyPolicyPage = lazy(() => import(/* webpackChunkName: "PrivacyPolicyPage" */ "@pages/PrivacyPolicyPage")); // prettier-ignore
const ProductsPage = lazy(() => import(/* webpackChunkName: "ProductsPage" */ "@pages/ProductsPage")); // prettier-ignore
const CheckoutPage = lazy(() => import(/* webpackChunkName: "CheckoutPage" */ "@pages/CheckoutPage")); // prettier-ignore
const PageNotFound = lazy(() => import(/* webpackChunkName: "PageNotFound" */ "@pages/PageNotFound")); // prettier-ignore
const HomePageRoutes = lazy(() => import(/* webpackChunkName: "HomePageRoutes" */ "./HomePageRoutes")); // prettier-ignore

/*
  Sentry routing instrumentation docs:
  https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/#usage-with-react-router-64-data-api
*/
const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

export const RootAppRouter = () => {
  return (
    <BrowserRouter basename="/">
      <AuthStateInitLayer>
        <Suspense fallback={<Loading />}>
          <SentryRoutes>
            <Route path="/" element={<PageContainer />}>
              <Route index element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/ToS" element={<TermsOfServicePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route
                path="/checkout"
                element={
                  <AuthProtectedRoute>
                    <CheckoutPage />
                  </AuthProtectedRoute>
                }
              />
              <Route
                path="/home/*"
                element={
                  <PaymentProtectedRoute>
                    <HomePageRoutes />
                  </PaymentProtectedRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </SentryRoutes>
        </Suspense>
      </AuthStateInitLayer>
    </BrowserRouter>
  );
};
