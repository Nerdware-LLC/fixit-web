import { useQuery } from "@apollo/client/react/hooks";
import { CreateItemButton } from "@components/Buttons/CreateItemButton";
import { EmptyListFallback, type EmptyListFallbackProps } from "@components/HelpInfo";
import { FileInvoiceDollarIcon } from "@components/Icons/FileInvoiceDollarIcon";
import { Error } from "@components/Indicators/Error";
import { Loading } from "@components/Indicators/Loading";
import { QUERIES } from "@graphql/queries";
import { CoreItemsListView, type ListViewRenderItemFn } from "@layouts/CoreItemsListView";
import { InvoicesListItem } from "./ListItem";
import { invoiceTableProps } from "./tableProps";

export const InvoicesListView = () => {
  // TODO impl refetch for InvoicesListView
  // eslint-disable-next-line
  const { data, loading, error, refetch, networkStatus } = useQuery(QUERIES.MY_INVOICES, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-only", // FIXME rm cache-only fetch policy from InvoicesListView
  });

  if (loading || networkStatus === 4) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <CoreItemsListView
      viewHeader="Invoices"
      viewBasePath="/home/invoices"
      renderItem={renderInvoicesListItem}
      headerComponents={
        <CreateItemButton createItemFormPath="/home/invoices/form" buttonText="Create Invoice" />
      }
      lists={[
        {
          listName: "Inbox",
          items: data?.myInvoices.assignedToUser ?? [],
          emptyListFallback: (
            <InvoicesEmptyListFallback
              text="Your Invoice Inbox is Empty"
              tooltip="Invoices you receive from others will appear here"
            />
          ),
        },
        {
          listName: "Sent",
          items: data?.myInvoices.createdByUser ?? [],
          emptyListFallback: (
            <InvoicesEmptyListFallback
              text="Your List of Sent Invoices is Empty"
              tooltip="Invoices you send to others will appear here"
            />
          ),
        },
      ]}
      tableProps={{
        ...invoiceTableProps,
        rows: [
          ...(data?.myInvoices.createdByUser.map((inv) => ({
            isItemOwnedByUser: true,
            ...inv,
          })) ?? []),
          ...(data?.myInvoices.assignedToUser.map((inv) => ({
            isItemOwnedByUser: false,
            ...inv,
          })) ?? []),
        ],
        noRowsOverlayProps: {
          backgroundIcon: <FileInvoiceDollarIcon />,
          // TODO add children here
        },
      }}
      sx={(theme) => ({
        "& a": {
          color: `${theme.palette.secondary.main} !important`, // "View Work Order" links
        },
      })}
    />
  );
};

const InvoicesEmptyListFallback = ({
  backgroundIcon = <FileInvoiceDollarIcon />,
  ...props
}: Partial<EmptyListFallbackProps>) => (
  <EmptyListFallback
    backgroundIcon={backgroundIcon}
    style={{ height: "50%", whiteSpace: "normal", marginTop: "6rem" }}
    // TODO move above styles to CoreItemsListView (must only apply in dual-list views)
    {...props}
  />
);

const renderInvoicesListItem: ListViewRenderItemFn = (props) => <InvoicesListItem {...props} />;
