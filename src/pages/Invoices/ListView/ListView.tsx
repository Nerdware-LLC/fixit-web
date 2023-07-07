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
  const { data, loading, error } = useQuery(QUERIES.MY_INVOICES);

  return loading ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <CoreItemsListView
      viewHeader="Invoices"
      viewBasePath="/home/invoices"
      renderItem={renderInvoicesListItem}
      listViewSettingsStoreKey="invoices"
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
    {...props}
  />
);

const renderInvoicesListItem: ListViewRenderItemFn = (props) => <InvoicesListItem {...props} />;
