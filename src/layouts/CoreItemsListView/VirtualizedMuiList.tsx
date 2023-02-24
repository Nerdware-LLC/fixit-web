import React, { type ForwardedRef } from "react";
import { Virtuoso as VirtuosoVirtualizedList } from "react-virtuoso";
import List from "@mui/material/List";

/**
 * Docs:
 * - https://virtuoso.dev/
 */
export const VirtualizedMuiList = (props: React.ComponentProps<typeof VirtuosoVirtualizedList>) => {
  return <VirtuosoVirtualizedList components={MUIComponents} draggable {...props} />;
};

const MUIComponents = {
  List: React.forwardRef<HTMLDivElement, React.ComponentProps<typeof List>>(
    (
      { children, style = {}, ...props }: React.ComponentProps<typeof List>,
      listRef: ForwardedRef<HTMLDivElement>
    ) => (
      <List
        component="div"
        ref={listRef}
        style={{ margin: 0, padding: 0, ...style }}
        {...(props as any)}
      >
        {children}
      </List>
    )
  )
};
