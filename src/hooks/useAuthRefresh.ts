import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APP_PATHS } from "@/routes/appPaths";
import { authService } from "@/services/authService";
import { authTokenLocalStorage, isActiveAccountStore } from "@/stores";

export const useAuthRefresh = () => {
  const nav = useNavigate();

  // EFFECT: On initial load, nav to /home or /products if user is auth'd
  useEffect(() => {
    (async () => {
      // See if the user already has an auth token
      if (authTokenLocalStorage.get()) {
        const { token: refreshedAuthToken } = await authService
          .refreshAuthToken()
          .catch(() => ({ token: null }));
        // Check if auth token was refreshed and user is auth'd
        if (refreshedAuthToken) {
          // If account is active, nav to /home, else nav to /products
          const isActivePaidAccount = isActiveAccountStore.get();
          if (isActivePaidAccount) {
            toast.success("Welcome back!", { toastId: "refreshed-token" });
            nav(APP_PATHS.HOME);
          } else {
            toast.info("Welcome back! Please select a subscription.", { toastId: "select-a-sub" });
            nav(APP_PATHS.PRODUCTS);
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
