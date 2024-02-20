import { useState, useEffect, useMemo } from "react";
import { PageLayoutContext } from "./PageLayoutContext";
import { testIsMobileUserAgent, testShouldUseMobileLayout } from "./helpers";

export const PageLayoutContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobileUserAgent, setIsMobileUserAgent] = useState(testIsMobileUserAgent());
  // If isMobileUserAgent OR the window is taller than it is wide, use mobile layout.
  const [shouldUseMobileLayout, setShouldUseMobileLayout] = useState(
    testShouldUseMobileLayout(isMobileUserAgent)
  );

  useEffect(() => {
    const handleWindowResize = () => {
      const newIsMobileUserAgentValue = testIsMobileUserAgent();
      setIsMobileUserAgent(newIsMobileUserAgentValue);
      setShouldUseMobileLayout(testShouldUseMobileLayout(newIsMobileUserAgentValue));
    };

    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [isMobileUserAgent]);

  const contextValues = useMemo(
    () => ({
      isMobileUserAgent,
      isMobilePageLayout: shouldUseMobileLayout,
    }),
    [isMobileUserAgent, shouldUseMobileLayout]
  );

  return <PageLayoutContext.Provider value={contextValues}>{children}</PageLayoutContext.Provider>;
};
