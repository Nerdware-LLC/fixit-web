import React, { type ForwardedRef } from "react";
import { Virtuoso as VirtuosoVirtualizedList, type VirtuosoProps } from "react-virtuoso";
import List, { type ListProps } from "@mui/material/List";

/**
 * Docs: https://virtuoso.dev/
 */
export const VirtualizedMuiList = (props: VirtuosoProps<unknown, unknown>) => {
  return <VirtuosoVirtualizedList components={MUIComponents} {...props} />;
};

const MUIComponents = {
  List: React.forwardRef<HTMLDivElement, ListProps>(function MuiList(
    { children, style = {}, ...props }: ListProps,
    listRef: ForwardedRef<HTMLDivElement>
  ) {
    return (
      <List
        component="div"
        ref={listRef}
        style={{ margin: 0, padding: 0, ...style }}
        {...(props as any)}
      >
        {children}
      </List>
    );
  }),
  /* This Footer simply adds a little padding to the bottom of the list comp
  to ensure the last li isn't bordering the bottom of the browser window. */
  Footer: () => <div style={{ minHeight: "1rem", width: "100%" }} />,
};
