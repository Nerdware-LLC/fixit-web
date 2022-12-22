import { useQuery } from "@apollo/client/react/hooks";
import { InvoicesListItem } from "./ListItem";
import { Loading, Error } from "@components";
import { QUERIES } from "@graphql";
import { CoreItemsListView, InboxListVisToggleBtns, useInboxListVisToggleBtns } from "@layouts";
import { MOCK_INVOICES } from "@/__tests__/mockItems"; // FIXME rm import, use only in test files

export const InvoicesListView = () => {
  // eslint-disable-next-line
  const { data, loading, error, refetch, networkStatus } = useQuery(QUERIES.MY_INVOICES, {
    notifyOnNetworkStatusChange: true,
    skip: true // TODO <-- skip for now, turn off later
  });
  const [listVisibility, handleChangeListVisibility] = useInboxListVisToggleBtns();

  // FIXME
  // const { createdByUser, assignedToUser } = invoiceListSettingsStore.useFilterAndSort(
  //   data?.myInvoices ?? []
  // );

  if (loading || networkStatus === 4) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <CoreItemsListView
      viewHeader="Invoices"
      viewBasePath="/home/invoices"
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
          items: MOCK_INVOICES.myInvoices.assignedToUser as any
        },
        {
          listName: "Sent",
          isListVisible: listVisibility.isSentVisible,
          items: MOCK_INVOICES.myInvoices.createdByUser as any
        }
      ]}
      listItemComponent={<InvoicesListItem />}
    />
  );
};
