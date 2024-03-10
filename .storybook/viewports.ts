/**
 * Custom viewports for Storybook
 *
 * These objects are provided to `parameters` of the `@storybook/addon-viewport` addon.
 *
 * @docs https://storybook.js.org/docs/react/essentials/viewport
 */
export const customViewports = {
  SmallMobile: {
    name: "Small Mobile ( 320 x 568 )",
    type: "mobile",
    styles: { width: "320px", height: "568px" },
  },
  MediumMobile: {
    name: "Medium Mobile ( 375 x 750 )",
    type: "mobile",
    styles: { width: "375px", height: "750px" },
  },
  LargeMobile: {
    name: "Large Mobile ( 428 x 926 )",
    type: "mobile",
    styles: { width: "428px", height: "926px" },
  },
  Tablet: {
    name: "Tablet ( 834 x 1112 )",
    type: "tablet",
    styles: { width: "834px", height: "1112px" },
  },
  Laptop: {
    name: "Laptop ( 1366 x 768 )",
    type: "desktop",
    styles: { width: "1366px", height: "768px" },
  },
  DesktopMonitor: {
    name: "Desktop Monitor ( 1920 x 1080 )",
    type: "desktop",
    styles: { width: "1920px", height: "1080px" },
  },
};
