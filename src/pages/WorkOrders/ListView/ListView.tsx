import { useQuery } from "@apollo/client/react/hooks";
import { Loading, Error } from "@components";
import { QUERIES } from "@graphql";
import { CoreItemsListView, type ListViewRenderItemFn } from "@layouts";
import { WorkOrdersListItem } from "./ListItem";
import { workOrderTableProps } from "./tableProps";
import { MOCK_WORK_ORDERS } from "@/__tests__/mockItems"; // FIXME rm import, use only in test files

export const WorkOrdersListView = () => {
  // eslint-disable-next-line
  const { data, loading, error, refetch, networkStatus } = useQuery(QUERIES.MY_WORK_ORDERS, {
    notifyOnNetworkStatusChange: true,
    skip: true // TODO <-- skip for now, turn off later
  });

  // FIXME
  // const { createdByUser, assignedToUser } = woListSettingsStore.useFilterAndSort(
  //   data?.myWorkOrders ?? []
  // );

  if (loading || networkStatus === 4) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <CoreItemsListView
      viewHeader="Work Orders"
      viewBasePath="/home/workorders"
      lists={[
        {
          listName: "Inbox",
          items: MOCK_WORK_ORDERS.myWorkOrders.assignedToUser as any
        },
        {
          listName: "Sent",
          items: MOCK_WORK_ORDERS.myWorkOrders.createdByUser as any
        }
      ]}
      renderItem={renderWorkOrdersListItem}
      tableProps={{
        ...workOrderTableProps,
        rows: [
          ...MOCK_WORK_ORDERS.myWorkOrders.createdByUser.map((wo) => ({
            isItemOwnedByUser: true,
            ...wo
          })),
          ...MOCK_WORK_ORDERS.myWorkOrders.assignedToUser.map((wo) => ({
            isItemOwnedByUser: false,
            ...wo
          }))
        ]
      }}
    />
  );
};

const renderWorkOrdersListItem: ListViewRenderItemFn = (props) => <WorkOrdersListItem {...props} />;
