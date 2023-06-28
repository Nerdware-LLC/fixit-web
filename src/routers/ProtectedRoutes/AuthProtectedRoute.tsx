import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticatedStore } from "@cache/isAuthenticatedStore";
import type React from "react";

export const AuthProtectedRoute = ({ children }: AuthProtectedRouteProps) => {
  const isUserAuthenticated = isAuthenticatedStore.useSubToStore();

  return !isUserAuthenticated ? (
    <Navigate to="/login" state={{ isRedirect: true }} replace />
  ) : (
    children ?? <Outlet />
  );
};

export type AuthProtectedRouteProps = { children?: React.JSX.Element };
