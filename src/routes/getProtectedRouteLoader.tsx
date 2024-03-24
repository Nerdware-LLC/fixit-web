import { redirect, type LoaderFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { PaymentRequiredToast } from "@/components/Alerts/PaymentRequiredToast";
import { isAuthenticatedStore, isActiveAccountStore } from "@/stores";
import { APP_PATHS } from "./appPaths";

/**
 * This function returns a react-router-dom RouteObject `loader` for "protected" routes
 * which require authentication and/or payment. It is used in the `RootAppRouter` file.
 */
export const getProtectedRouteLoader = (
  routeRequirements: { authenticationRequired: boolean; paymentRequired: boolean },
  customRouteRequirements?: () => void
): LoaderFunction => {
  const { authenticationRequired, paymentRequired } = routeRequirements;

  return () => {
    // AUTHENTICATION
    if (authenticationRequired) {
      const isUserAuthenticated = isAuthenticatedStore.get();
      if (!isUserAuthenticated) {
        toast.info(
          "You must be logged in to perform this action. Please sign in or create an account to continue.",
          { toastId: "auth-required-redirect" }
        );
        throw redirect(APP_PATHS.LOGIN);
      }
    }

    // PAYMENT
    if (paymentRequired) {
      const isActivePaidAccount = isActiveAccountStore.get();
      if (!isActivePaidAccount) {
        // PaymentRequiredToast contains a btn to fetch a link to the user's Stripe customer portal
        toast(({ closeToast }) => <PaymentRequiredToast closeToast={closeToast} />, {
          toastId: "payment-required-redirect",
          autoClose: false,
          closeButton: false, // PaymentRequiredToast contains its own close btn
          style: { backgroundColor: "transparent" }, // hide react-toastify's modal
        });

        throw redirect(APP_PATHS.PRODUCTS);
      }
    }

    // CUSTOM ROUTE REQUIREMENTS
    if (customRouteRequirements) customRouteRequirements();

    // RETURN NULL IF ALL REQUIREMENTS ARE MET
    return null;
  };
};
