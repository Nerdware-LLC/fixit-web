import { createContext, useContext } from "react";

export const PageLayoutContext = createContext<{
  isMobilePageLayout: boolean;
}>({
  isMobilePageLayout: false
});

export const usePageLayoutContext = () => useContext(PageLayoutContext);
