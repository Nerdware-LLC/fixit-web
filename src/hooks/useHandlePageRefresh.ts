import { useEffect } from "react";
import { abortController } from "@/services/helpers/abortController";

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
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      abortController.abort();
      if (handlePageRefresh) handlePageRefresh(event);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handlePageRefresh]);
};

export type PageRefreshHandler = (event: BeforeUnloadEvent) => void;
