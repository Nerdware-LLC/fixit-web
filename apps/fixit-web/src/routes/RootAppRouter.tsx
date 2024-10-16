import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RootAppLayout } from "@/layouts/RootAppLayout";
import { checkoutValuesStore } from "@/stores/checkoutValuesStore.js";
import { APP_PATHS, APP_PATH_COMPONENTS } from "./appPaths.js";
import { getProtectedRouteLoader } from "./getProtectedRouteLoader.js";

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const rootAppBrowserRouter = sentryCreateBrowserRouter(
  [
    {
      path: APP_PATHS.ROOT,
      element: <RootAppLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          lazy: () => import(/* webpackChunkName: "LandingPage" */ "@/pages/LandingPage"),
        },
        {
          path: APP_PATHS.REGISTER,
          lazy: () => import(/* webpackChunkName: "RegisterPage" */ "@/pages/RegisterPage"),
        },
        {
          path: APP_PATHS.LOGIN,
          lazy: () => import(/* webpackChunkName: "LoginPage" */ "@/pages/LoginPage"),
        },
        {
          path: APP_PATHS.FORGOT_PASSWORD,
          lazy: () =>
            import(/* webpackChunkName: "ForgotPasswordPage" */ "@/pages/ForgotPasswordPage"),
        },
        {
          path: APP_PATHS.RESET_PASSWORD,
          lazy: () =>
            import(/* webpackChunkName: "ResetPasswordPage" */ "@/pages/ResetPasswordPage"),
        },
        {
          path: APP_PATHS.ToS,
          lazy: () =>
            import(/* webpackChunkName: "TermsOfServicePage" */ "@/pages/TermsOfServicePage"),
        },
        {
          path: APP_PATHS.PRIVACY,
          lazy: () =>
            import(/* webpackChunkName: "PrivacyPolicyPage" */ "@/pages/PrivacyPolicyPage"),
        },
        {
          path: APP_PATHS.COOKIES,
          lazy: () => import(/* webpackChunkName: "CookiePolicyPage" */ "@/pages/CookiePolicyPage"),
        },
        {
          path: APP_PATHS.PRODUCTS,
          lazy: () => import(/* webpackChunkName: "ProductsPage" */ "@/pages/ProductsPage"),
        },
        {
          path: APP_PATHS.CHECKOUT,
          lazy: () => import(/* webpackChunkName: "CheckoutPage" */ "@/pages/CheckoutPage"),
          loader: getProtectedRouteLoader(
            { authenticationRequired: true, paymentRequired: false },
            () => {
              // Custom route requirement: user must have selected a subscription
              if (!checkoutValuesStore.get().selectedSubscription) {
                toast.info("Please select a subscription.", { toastId: "select-a-sub" });
                throw redirect(APP_PATHS.PRODUCTS);
              }
            }
          ),
        },
        {
          path: APP_PATH_COMPONENTS.HOME,
          lazy: () => import(/* webpackChunkName: "HomePageLayout" */ "@/layouts/HomePageLayout"),
          loader: getProtectedRouteLoader({ authenticationRequired: true, paymentRequired: true }),
          children: [
            {
              lazy: () =>
                import(
                  /* webpackChunkName: "StripeConnectOnboardingStateLayer" */ "./StripeConnectOnboardingStateLayer"
                ),
              children: [
                {
                  index: true,
                  lazy: () => import(/* webpackChunkName: "Dashboard" */ "@/pages/Dashboard"),
                },
                {
                  path: APP_PATH_COMPONENTS.WORK_ORDERS,
                  children: [
                    {
                      index: true,
                      lazy: () =>
                        import(
                          /* webpackChunkName: "WorkOrdersListView" */ "@/pages/WorkOrdersListView"
                        ),
                    },
                    {
                      path: APP_PATH_COMPONENTS.FORM_VIEW,
                      lazy: () =>
                        import(
                          /* webpackChunkName: "WorkOrderFormView" */ "@/pages/WorkOrderFormView"
                        ),
                    },
                    {
                      path: APP_PATH_COMPONENTS.ITEM_VIEW,
                      lazy: () =>
                        import(
                          /* webpackChunkName: "WorkOrderItemView" */ "@/pages/WorkOrderItemView"
                        ),
                    },
                  ],
                },
                {
                  path: APP_PATH_COMPONENTS.INVOICES,
                  children: [
                    {
                      index: true,
                      lazy: () =>
                        import(
                          /* webpackChunkName: "InvoicesListView" */ "@/pages/InvoicesListView"
                        ),
                    },
                    {
                      path: APP_PATH_COMPONENTS.FORM_VIEW,
                      lazy: () =>
                        import(/* webpackChunkName: "InvoiceFormView" */ "@/pages/InvoiceFormView"),
                    },
                    {
                      path: APP_PATH_COMPONENTS.ITEM_VIEW,
                      lazy: () =>
                        import(/* webpackChunkName: "InvoiceItemView" */ "@/pages/InvoiceItemView"),
                    },
                  ],
                },
                {
                  path: APP_PATH_COMPONENTS.CONTACTS,
                  children: [
                    {
                      index: true,
                      lazy: () =>
                        import(
                          /* webpackChunkName: "ContactsListView" */ "@/pages/ContactsListView"
                        ),
                    },
                    {
                      path: APP_PATH_COMPONENTS.ITEM_VIEW,
                      lazy: () =>
                        import(/* webpackChunkName: "ContactItemView" */ "@/pages/ContactItemView"),
                    },
                  ],
                },
                {
                  path: APP_PATH_COMPONENTS.PROFILE,
                  lazy: () => import(/* webpackChunkName: "ProfilePage" */ "@/pages/ProfilePage"),
                },
              ],
            },
          ],
        },
        {
          path: "*",
          lazy: () => import(/* webpackChunkName: "PageNotFound" */ "@/pages/PageNotFound"),
        },
      ],
    },
  ],
  {
    basename: APP_PATHS.ROOT,
  }
);

export const RootAppRouter = () => <RouterProvider router={rootAppBrowserRouter} />;
