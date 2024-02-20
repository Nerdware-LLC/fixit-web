import { useMemo } from "react";
import { useQuery } from "@apollo/client/react/hooks";
import { Loading, ErrorDialog } from "@/components/Indicators";
import {
  CoreItemsListViewContent,
  type CoreItemsListViewContentProps,
} from "./CoreItemsListViewContent";
import type { GridValidRowModel } from "@mui/x-data-grid";
import type { DocumentNode } from "graphql";

/**
 * Provides common styles/props/logic to all core-item list views.
 */
export const CoreItemsListView = <
  QueryReturnDataType extends Record<string, unknown>,
  ListItemType extends Record<string, unknown>,
  DataGridItemType extends GridValidRowModel = ListItemType,
>({
  listQuery,
  getListsAndTableProps,
  ...coreItemsListViewContentProps
}: CoreItemsListViewProps<QueryReturnDataType, ListItemType, DataGridItemType>) => {
  const { data, loading, error } = useQuery<QueryReturnDataType>(listQuery);

  const { lists, tableProps } = useMemo(() => {
    return !loading && !error && data
      ? getListsAndTableProps(data)
      : { lists: [], tableProps: { rows: [], columns: [] } };
  }, [data, loading, error, getListsAndTableProps]);

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorDialog error={error} />
  ) : (
    <CoreItemsListViewContent<ListItemType, DataGridItemType>
      lists={lists}
      tableProps={tableProps}
      {...coreItemsListViewContentProps}
    />
  );
};

export type CoreItemsListViewProps<
  QueryReturnDataType extends Record<string, unknown>,
  ListItemType extends Record<string, unknown>,
  DataGridItemType extends GridValidRowModel = ListItemType,
> = {
  listQuery: DocumentNode;
  getListsAndTableProps: (
    data: QueryReturnDataType
  ) => Pick<CoreItemsListViewContentProps<ListItemType, DataGridItemType>, "lists" | "tableProps">;
} & Omit<CoreItemsListViewContentProps<ListItemType, DataGridItemType>, "lists" | "tableProps">;
