import { usePageLayoutContext } from "@/app/PageLayoutContext/usePageLayoutContext.js";
import { DesktopAppBarMenu } from "./DesktopAppBarMenu.jsx";
import { MobileAppBarMenu } from "./MobileAppBarMenu.jsx";

/**
 * This component returns an AppBar menu component which is appropriate for the device/viewport.
 *
 * - When `isMobilePageLayout` is `true`: returns {@link MobileAppBarMenu}
 * - When `isMobilePageLayout` is `false`: returns {@link DesktopAppBarMenu}
 */
export const AppBarMenu = () => {
  const { isMobilePageLayout } = usePageLayoutContext();

  return isMobilePageLayout ? <MobileAppBarMenu /> : <DesktopAppBarMenu />;
};
