import { useState, useEffect } from "react";
import { PageLayoutContext } from "./PageLayoutContext";
import { testIsMobileUserAgent } from "./testIsMobileUserAgent";

export const PageLayoutContextProvider = ({ children }: PageLayoutContextProviderProps) => {
  const [isMobileUserAgent, setIsMobileUserAgent] = useState(testIsMobileUserAgent());
  // If isMobileUserAgent OR the window is taller than it is wide, use mobile layout.
  const [shouldUseMobileLayout, setShouldUseMobileLayout] = useState(
    isMobileUserAgent || window.innerWidth < window.innerHeight
  );

  useEffect(() => {
    const handleWindowResize = () => {
      const newIsMobileUserAgentValue = testIsMobileUserAgent();
      setIsMobileUserAgent(newIsMobileUserAgentValue);
      setShouldUseMobileLayout(newIsMobileUserAgentValue || window.innerWidth < window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [isMobileUserAgent]);

  return (
    <PageLayoutContext.Provider
      value={{
        isMobileUserAgent,
        isMobilePageLayout: shouldUseMobileLayout,
      }}
    >
      {children}
    </PageLayoutContext.Provider>
  );
};

export type PageLayoutContextProviderProps = { children: React.ReactNode };
