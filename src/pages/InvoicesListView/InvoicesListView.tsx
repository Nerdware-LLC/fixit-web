import { CreateItemButton } from "@/components/Buttons/CreateItemButton.jsx";
import { FileInvoiceDollarIcon } from "@/components/Icons/FileInvoiceDollarIcon.jsx";
import { InvoiceListItemButton } from "@/components/List/listItems/InvoiceListItem.jsx";
import { QUERIES } from "@/graphql/queries.js";
import {
  CoreItemsListView,
  LIST_VIEW_LIST_NAMES,
  TABLE_VIEW_DATA_SETS,
  type ListViewRenderItemFn,
} from "@/layouts/CoreItemsListView";
import { APP_PATHS } from "@/routes/appPaths.js";
import { invoiceTableProps, type InvoiceTableRowData } from "./tableProps.js";
import type { Invoice, MyInvoicesQueryResponse } from "@/types/graphql.js";

type MyInvoicesQueryData = { myInvoices: MyInvoicesQueryResponse };

const getListsAndTablePropsFromMyInvoices = (data: MyInvoicesQueryData) => {
  const invoicesCreatedByUser = data?.myInvoices?.createdByUser ?? [];
  const invoicesAssignedToUser = data?.myInvoices?.assignedToUser ?? [];
  return {
    lists: [
      {
        listName: LIST_VIEW_LIST_NAMES.INBOX,
        items: invoicesAssignedToUser,
        listComponentProps: {
          EmptyPlaceholder: {
            text: "Your Invoice Inbox is Empty",
            tooltip: "Invoices you receive from others will appear here",
            backgroundIcon: <FileInvoiceDollarIcon />,
          },
        },
      },
      {
        listName: LIST_VIEW_LIST_NAMES.SENT,
        items: invoicesCreatedByUser,
        listComponentProps: {
          EmptyPlaceholder: {
            text: "Your List of Sent Invoices is Empty",
            tooltip: "Invoices you send to others will appear here",
            backgroundIcon: <FileInvoiceDollarIcon />,
          },
        },
      },
    ],
    tableProps: {
      ...invoiceTableProps,
      backgroundIcon: <FileInvoiceDollarIcon />,
      rows: [
        ...invoicesCreatedByUser.map((inv) => ({
          dataSet: TABLE_VIEW_DATA_SETS.SENT,
          ...inv,
        })),
        ...invoicesAssignedToUser.map((inv) => ({
          dataSet: TABLE_VIEW_DATA_SETS.RECEIVED,
          ...inv,
        })),
      ],
    },
  };
};

export const InvoicesListView = () => (
  <CoreItemsListView<MyInvoicesQueryData, Invoice, InvoiceTableRowData>
    listQuery={QUERIES.MY_INVOICES}
    getListsAndTableProps={getListsAndTablePropsFromMyInvoices}
    headerLabel="Invoices"
    headerComponents={
      <CreateItemButton
        createItemFormPath={APP_PATHS.INVOICES_FORM_VIEW}
        buttonText="Create Invoice"
      />
    }
    itemViewBasePath={APP_PATHS.INVOICES_LIST_VIEW}
    listViewSettingsStoreKey="invoices"
    renderItem={renderInvoicesListItem}
  />
);

// Exported as "Component" for react-router-dom lazy loading
export const Component = InvoicesListView;

const renderInvoicesListItem: ListViewRenderItemFn<Invoice> = ({ listName, item, onClick }) => (
  <InvoiceListItemButton
    invoice={item}
    onClick={onClick}
    data-item-id={item.id}
    userToDisplay={listName === LIST_VIEW_LIST_NAMES.INBOX ? item.createdBy : item.assignedTo}
    // userToDisplay is the other user
  />
);
