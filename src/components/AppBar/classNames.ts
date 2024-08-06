import { appBarMenuClassNames } from "./AppBarMenu/classNames.js";

/**
 * Class names for `AppBar` components (src/components/AppBar/).
 */
export const appBarClassNames = {
  /** Class names for `AppBarMenu` components (src/components/AppBar/AppBarMenu/). */
  menu: { ...appBarMenuClassNames },
} as const;
