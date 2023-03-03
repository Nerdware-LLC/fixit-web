import { useQuery } from "@apollo/client/react/hooks";
import { Loading, Error } from "@components";
import { QUERIES } from "@graphql";
import { CoreItemsListView, type ListViewRenderItemFn } from "@layouts";
import { InvoicesListItem } from "./ListItem";
import { invoiceTableProps } from "./tableProps";
import { MOCK_INVOICES } from "@/__tests__/mockItems"; // FIXME rm import, use only in test files

export const InvoicesListView = () => {
  // eslint-disable-next-line
  const { data, loading, error, refetch, networkStatus } = useQuery(QUERIES.MY_INVOICES, {
    notifyOnNetworkStatusChange: true,
    skip: true // TODO <-- skip for now, turn off later
  });

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
      lists={[
        {
          listName: "Inbox",
          items: MOCK_INVOICES.myInvoices.assignedToUser as any
        },
        {
          listName: "Sent",
          items: MOCK_INVOICES.myInvoices.createdByUser as any
        }
      ]}
      renderItem={renderInvoicesListItem}
      tableProps={{
        ...invoiceTableProps,
        rows: [
          ...MOCK_INVOICES.myInvoices.createdByUser.map((inv) => ({
            isItemOwnedByUser: true,
            ...inv
          })),
          ...MOCK_INVOICES.myInvoices.assignedToUser.map((inv) => ({
            isItemOwnedByUser: false,
            ...inv
          }))
        ]
      }}
    />
  );
};

const renderInvoicesListItem: ListViewRenderItemFn = (props) => <InvoicesListItem {...props} />;
