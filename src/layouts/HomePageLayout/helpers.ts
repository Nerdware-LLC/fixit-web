import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { APP_PATHS } from "@/routes/appPaths";

/**
 * This hook takes a `path` and returns an object containing a boolean value,
 * `isActive`, which components use to set styles based on their `active` state.
 */
export const useIsActiveNavAction = (path?: string) => {
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsActive(
      !!path && (path === APP_PATHS.HOME ? pathname === path : pathname.startsWith(path))
    );
  }, [path, pathname]);

  return { isActive };
};
