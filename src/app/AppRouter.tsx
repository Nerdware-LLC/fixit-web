import { Suspense, lazy } from "react";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import { Loading, AuthProtectedRoute, PaymentProtectedRoute } from "../components";
import { ENV } from "../config";

// Layouts:
const LandingAndAuthPagesLayout = lazy(() => import("../layouts/LandingAndAuthPagesLayout"));
const HomePagesLayout = lazy(() => import("../layouts/HomePagesLayout"));
// Pages:
const LandingPage = lazy(() => import("../pages/LandingPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const PrivacyPolicyPage = lazy(() => import("../pages/PrivacyPolicyPage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const WorkOrdersPage = lazy(() => import("../pages/WorkOrdersPage"));
const ConnectBridge = lazy(() => import("../pages/StripeConnectBridge"));
const CustomerPortalBridge = lazy(() => import("../pages/StripeCustomerPortalBridge"));
const DevNavMenu = lazy(() => import("../pages/DevNavMenu"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

export const AppRouter = () => (
  <BrowserRouter basename="/">
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<LandingAndAuthPagesLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
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
          path="/home"
          element={
            <PaymentProtectedRoute>
              <MemoryRouter initialEntries={["/home"]}>
                <HomePagesLayout />
              </MemoryRouter>
            </PaymentProtectedRoute>
          }
        >
          <Route path="workorders" element={<WorkOrdersPage />} />
          <Route path="connect/:redirectType" element={<ConnectBridge />} />
          <Route path="customer-portal" element={<CustomerPortalBridge />} />
        </Route>
        {!ENV.IS_PROD && <Route path="/dev" element={<DevNavMenu />} />}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
