import { useLayoutEffect } from "react";
import { httpService } from "@/services/httpService.js";

/**
 * This hook is used to handle page refresh events.
 *
 * - HTTP requests are prevented from being sent when the user refreshes the page.
 * - The `handlePageRefresh` fn, if provided, is called with the {@link BeforeUnloadEvent}
 *   when the user refreshes the page.
 *
 * @param handlePageRefresh - A function to call when the user refreshes the page.
 */
export const useHandlePageRefresh = (handlePageRefresh?: PageRefreshHandler) => {
  // EFFECT: Prevent the http request from being sent when the user refreshes the page
  useLayoutEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      httpService.abortRequests();
      if (handlePageRefresh) handlePageRefresh(event);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handlePageRefresh]);
};

export type PageRefreshHandler = (event: BeforeUnloadEvent) => void;
