import {
  Virtuoso as VirtuosoVirtualizedList,
  type VirtuosoProps,
  type Components,
} from "react-virtuoso";
import {
  useForwardRefListComponent,
  EmptyListFallback,
  type ListComponentProps,
  type EmptyListFallbackProps,
} from "./subComponents";
import type { OverrideProperties } from "type-fest";

/**
 * A {@link MuiList|Mui List} component with virtualized rendering via
 * [react-virtuoso](https://virtuoso.dev/).
 */
export const VirtualizedList = <TDataItem, TContext>({
  components = {},
  componentProps = {},
  style = {},
  ...virtuosoListProps
}: VirtualizedListProps<TDataItem, TContext>) => {
  const { List: listComponentProps = {}, EmptyPlaceholder: emptyPlaceholderComponentProps = {} } =
    componentProps;

  const componentsWithDefaults = {
    ...components,
    List: useForwardRefListComponent(listComponentProps),
    ...(!components?.EmptyPlaceholder && {
      EmptyPlaceholder: () => <EmptyListFallback {...emptyPlaceholderComponentProps} />,
    }),
  };

  return (
    <VirtuosoVirtualizedList
      components={componentsWithDefaults}
      style={{ height: "100%", overflowX: "hidden", ...style }}
      {...virtuosoListProps}
    />
  );
};

export type VirtualizedListProps<TDataItem = unknown, TContext = unknown> = OverrideProperties<
  VirtuosoProps<TDataItem, TContext>,
  {
    components?: Omit<Components<TDataItem, TContext>, "List">;
  }
> & {
  componentProps?: {
    List?: ListComponentProps;
    EmptyPlaceholder?: EmptyListFallbackProps;
  };
};
