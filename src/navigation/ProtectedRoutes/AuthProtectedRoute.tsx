import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticatedStore } from "@app";

export const AuthProtectedRoute = ({ children }: { children?: JSX.Element }) => {
  const isUserAuthenticated = isAuthenticatedStore.useSubToStore();

  return !isUserAuthenticated ? (
    <Navigate to="/login" state={{ isRedirect: true }} replace />
  ) : (
    children ?? <Outlet />
  );
};
