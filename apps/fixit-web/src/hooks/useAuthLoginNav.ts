import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APP_PATHS } from "@/routes/appPaths.js";
import { isAuthenticatedStore, isActiveAccountStore } from "@/stores";

export type UseAuthStateNavParams = {
  /** Error message to show if the auth request fails, if any (optional). */
  authReqFailureErrorMsg?: string;
};

/**
 * This hook provides a function which navigates the User to the appropriate
 * page based on their current authentication state and account status.
 */
export const useAuthLoginNav = ({ authReqFailureErrorMsg: errMsg }: UseAuthStateNavParams = {}) => {
  const nav = useNavigate();

  const handleLoginNav = useCallback(() => {
    const isAuthd = isAuthenticatedStore.get();
    // If the User is auth'd, toast+redirect based on account status
    if (isAuthd) {
      // If account is active, nav to /home, else nav to /products
      const isActivePaidAccount = isActiveAccountStore.get();
      if (isActivePaidAccount) {
        toast.success("Welcome back!", { toastId: "welcome-back" });
        nav(APP_PATHS.HOME);
      } else {
        toast.info("Welcome back! Please select a subscription.", { toastId: "select-a-sub" });
        nav(APP_PATHS.PRODUCTS);
      }
    } else {
      // If the req failed, toast+redirect
      if (errMsg) toast.error(errMsg, { toastId: "auth-req-failed" });
      nav(APP_PATHS.LOGIN);
    }
  }, [errMsg, nav]);

  return {
    /**
     * Navigates the User to the appropriate page based on their auth state and account status.
     */
    handleLoginNav,
  };
};
