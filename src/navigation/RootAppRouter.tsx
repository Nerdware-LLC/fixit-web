import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthStateInitLayer } from "./AuthStateInitLayer";
import { AuthProtectedRoute, PaymentProtectedRoute } from "./ProtectedRoutes";
import { Loading } from "@components";
import { PageContainer } from "@layouts";

const LandingPage = lazy(() => import("@pages/LandingPage"));
const RegisterPage = lazy(() => import("@pages/RegisterPage"));
const LoginPage = lazy(() => import("@pages/LoginPage"));
const TermsOfServicePage = lazy(() => import("@pages/TermsOfServicePage"));
const PrivacyPolicyPage = lazy(() => import("@pages/PrivacyPolicyPage"));
const ProductsPage = lazy(() => import("@pages/ProductsPage"));
const CheckoutPage = lazy(() => import("@pages/CheckoutPage"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));
const HomePageRoutes = lazy(() => import("./HomePageRoutes")); // descendant routes

export const RootAppRouter = () => (
  <BrowserRouter basename="/">
    <AuthStateInitLayer>
      <Suspense fallback={<Loading />}>
        <Routes>
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
        </Routes>
      </Suspense>
    </AuthStateInitLayer>
  </BrowserRouter>
);