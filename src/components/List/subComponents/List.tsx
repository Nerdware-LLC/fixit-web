import { forwardRef, type ForwardedRef } from "react";
import deepMerge from "lodash.merge";
import { styled } from "@mui/material/styles";
import MuiList, { type ListProps as MuiListProps } from "@mui/material/List";
import { typographyClasses } from "@mui/material/Typography";
import { listClassNames } from "../classNames";

/**
 * This function return the `List` ForwardRefExoticComponent used by `VirtualizedList` for the
 * `components.List` prop. Exporting it this way is allows `VirtualizedList` to pass props to
 * the `List` component.
 *
 * It is a styled Mui List as a `<div>` element with ref forwarding.
 */
export const useForwardRefListComponent = (listPropsFromParent: ListComponentProps) => {
  return styled(
    forwardRef<HTMLDivElement, ListComponentProps>(function ListComponent(
      { children, ...listProps }: ListComponentProps,
      ref: ForwardedRef<HTMLDivElement>
    ) {
      const mergedListProps = deepMerge({ ...listPropsFromParent }, listProps);
      return (
        <MuiList
          component="div"
          ref={ref}
          className={listClassNames.virtualizedList.listComponent}
          disablePadding
          {...mergedListProps}
        >
          {children}
        </MuiList>
      );
    })
  )({
    overflow: "hidden",
    scrollbarGutter: "stable",

    [`& .${typographyClasses.root}`]: {
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  });
};

export type ListComponentProps = Omit<MuiListProps<"div">, "component">;
