import { createContext } from "react";

export const PAGE_LAYOUT_CONTEXT_DEFAULT_VALUES = {
  isMobileUserAgent: true,
  isMobilePageLayout: true,
};

export const PageLayoutContext = createContext<typeof PAGE_LAYOUT_CONTEXT_DEFAULT_VALUES>(
  PAGE_LAYOUT_CONTEXT_DEFAULT_VALUES
);
