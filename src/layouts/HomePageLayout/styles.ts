/**
 * This object contains HomePageLayout style values for which a dependency
 * relationship exists between HomePageLayout components.
 */
export const homePageLayoutSharedStyles = {
  /**
   * The `"height"` of `MobileNavBar`; this is also used to calculate the height of
   * the container element in `HomePageLayout` when `isMobilePageLayout` is `true`.
   */
  mobileNavBarHeight: "3.5rem",
  /**
   * The `"width"` of `DesktopNavDrawer`; this is also used to calculate the width of
   * the container element in `HomePageLayout` when `isMobilePageLayout` is `false`.
   */
  desktopNavDrawerWidth: "clamp(12.5rem, 20%, 14rem)",
} as const;
