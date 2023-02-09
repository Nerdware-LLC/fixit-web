import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticatedStore, isActiveAccountStore } from "@app";

export const PaymentProtectedRoute = ({ children }: { children?: JSX.Element }) => {
  const isUserAuthenticated = isAuthenticatedStore.useSubToStore();
  const isActivePaidAccount = isActiveAccountStore.useSubToStore();

  // prettier-ignore
  return (
    !isUserAuthenticated
    ? <Navigate to="/login" replace />
    : !isActivePaidAccount
    ? <Navigate to="/checkout" replace />
    : children ?? <Outlet />
  );
};
