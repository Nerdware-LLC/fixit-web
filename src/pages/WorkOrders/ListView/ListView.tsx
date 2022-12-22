import { useQuery } from "@apollo/client/react/hooks";
import { WorkOrdersListItem } from "./ListItem";
import { Loading, Error } from "@components";
import { QUERIES } from "@graphql";
import { CoreItemsListView, InboxListVisToggleBtns, useInboxListVisToggleBtns } from "@layouts";
import { MOCK_WORK_ORDERS } from "@/__tests__/mockItems"; // FIXME rm import, use only in test files

export const WorkOrdersListView = () => {
  // eslint-disable-next-line
  const { data, loading, error, refetch, networkStatus } = useQuery(QUERIES.MY_WORK_ORDERS, {
    notifyOnNetworkStatusChange: true,
    skip: true // TODO <-- skip for now, turn off later
  });
  const [listVisibility, handleChangeListVisibility] = useInboxListVisToggleBtns();

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
      headerRowListControlComponents={
        <InboxListVisToggleBtns
          listVisibility={listVisibility}
          onChange={handleChangeListVisibility}
          style={{ marginLeft: "auto", marginRight: "2rem" }}
        />
      }
      lists={[
        {
          listName: "Inbox",
          isListVisible: listVisibility.isInboxVisible,
          items: MOCK_WORK_ORDERS.myWorkOrders.assignedToUser as any
        },
        {
          listName: "Sent",
          isListVisible: listVisibility.isSentVisible,
          items: MOCK_WORK_ORDERS.myWorkOrders.createdByUser as any
        }
      ]}
      listItemComponent={<WorkOrdersListItem />}
    />
  );
};
