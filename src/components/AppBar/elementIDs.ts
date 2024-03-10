import { appBarMenuElementIDs } from "./AppBarMenu/elementIDs";

/**
 * IDs of `AppBar` components (src/components/AppBar/).
 */
export const appBarElementIDs = {
  root: "appbar-root",
  fixedPositionOffset: "appbar-fixed-position-offset",

  /** IDs of `AppBarMenu` components (src/components/AppBar/AppBarMenu/). */
  appBarMenu: {
    ...appBarMenuElementIDs,
  },
} as const;
