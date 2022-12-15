import { DesktopLandingPage } from "./LandingPage.desktop";
import { MobileLandingPage } from "./LandingPage.mobile";
import { usePageLayoutContext } from "@components";

// FIXME Logo img + title too far apart.

/**
 * **LandingPage**
 * - `Outlet` of `LandingAndAuthPagesLayout`
 * - Renders when path is "/"
 */
export const LandingPage = () => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return !isMobilePageLayout ? <DesktopLandingPage /> : <MobileLandingPage />;
};
