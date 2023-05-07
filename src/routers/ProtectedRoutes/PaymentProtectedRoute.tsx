import { Navigate, Outlet } from "react-router-dom";
import { isActiveAccountStore } from "@cache/isActiveAccountStore";
import { isAuthenticatedStore } from "@cache/isAuthenticatedStore";

export const PaymentProtectedRoute = ({ children }: PaymentProtectedRouteProps) => {
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

export type PaymentProtectedRouteProps = { children?: JSX.Element };
