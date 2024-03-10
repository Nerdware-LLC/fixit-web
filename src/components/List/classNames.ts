import { listClasses as muiListClassNames } from "@mui/material/List";
import { listItemClassNames } from "./listItems/classNames";

/**
 * Class names for `List` components (src/components/List/).
 *
 * This object includes {@link muiListClassNames|listClasses} exported from Mui's
 * `@mui/material/List` component under the key `muiList`.
 */
export const listClassNames = {
  muiList: { ...muiListClassNames },
  virtualizedList: {
    listComponent: "virtualized-list__list-component",
    footerComponent: "virtualized-list__footer-component",
    emptyPlaceHolderComponent: {
      root: "virtualized-list__empty-placeholder__root",
      circleContainer: "virtualized-list__empty-placeholder__circle-container",
      text: "virtualized-list__empty-placeholder__text",
    },
  },
  listItems: { ...listItemClassNames },
} as const;
