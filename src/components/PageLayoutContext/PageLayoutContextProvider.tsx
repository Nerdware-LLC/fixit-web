import { useState, useEffect } from "react";
import { PageLayoutContext } from "./PageLayoutContext";

export const PageLayoutContextProvider = ({ children }: { children: React.ReactNode }) => {
  // If the window is taller than it is wide, use mobile layout.
  const [shouldUseMobileLayout, setShouldUseMobileLayout] = useState(
    window.innerWidth < window.innerHeight
  );

  useEffect(() => {
    const handleWindowResize = () => {
      setShouldUseMobileLayout(window.innerWidth < window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <PageLayoutContext.Provider value={{ isMobilePageLayout: shouldUseMobileLayout }}>
      {children}
    </PageLayoutContext.Provider>
  );
};
