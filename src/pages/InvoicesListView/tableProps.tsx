import { ContactAvatar } from "@/components/Avatar/ContactAvatar";
import { getDataGridColDefs } from "@/components/DataGrid/helpers/getDataGridColDefs";
import { Link } from "@/components/Navigation/Link";
import { getItemViewPath } from "@/routes/helpers";
import { intToCurrencyStr } from "@/utils/formatters/currency";
import type { Invoice } from "@/graphql/types";
import type { TableViewDataSetProp } from "@/layouts/CoreItemsListView/types";
import type { DataGridProps } from "@mui/x-data-grid";

/**
 * The type of data provided in the InvoicesListView table.
 *
 * > "dataSet" added in ./InvoicesListView
 */
export type InvoiceTableRowData = Invoice & TableViewDataSetProp;

const COLUMNS = getDataGridColDefs<
  InvoiceTableRowData,
  {
    omit: "__typename" | "id" | "stripePaymentIntentID";
  }
>({
  dataSet: {
    headerName: "Sent/Received",
    minWidth: 115,
    headerAlign: "left",
    align: "center",
  },
  createdBy: {
    headerName: "Created By",
    valueGetter: ({ row: inv }) => inv.createdBy.profile.displayName,
    renderCell: ({ row: inv }) => (
      <ContactAvatar contact={inv.createdBy} viewContactOnClick={false} />
    ),
    flex: 1,
    minWidth: 175,
  },
  assignedTo: {
    headerName: "Assigned To",
    valueGetter: ({ row: inv }) => inv.assignedTo.profile.displayName,
    renderCell: ({ row: inv }) => (
      <ContactAvatar contact={inv.assignedTo} viewContactOnClick={false} />
    ),
    flex: 1,
    minWidth: 175,
  },
  amount: {
    headerName: "Amount",
    valueFormatter: ({ value }) => intToCurrencyStr(value),
    flex: 0.5,
    minWidth: 100,
    headerAlign: "right",
    align: "right",
  },
  status: {
    headerName: "Status",
    flex: 0.5,
    minWidth: 115,
    headerAlign: "center",
    align: "center",
  },
  workOrder: {
    headerName: "Work Order",
    flex: 0.5,
    align: "center",
    headerAlign: "center",
    valueGetter: ({ row: inv }) => inv?.workOrder?.id,
    renderCell: ({ value: workOrder }) =>
      !!workOrder?.id && (
        <Link
          to={getItemViewPath("workorders", workOrder.id)}
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => event.stopPropagation()}
          style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}
        >
          View Work Order
        </Link>
      ),
  },
  createdAt: {
    headerName: "Created",
    type: "dateTime",
    flex: 1,
  },
  updatedAt: {
    headerName: "Last Updated",
    type: "dateTime",
    flex: 1,
  },
});

export const invoiceTableProps = {
  columns: Object.values(COLUMNS),
} as const satisfies Partial<DataGridProps<InvoiceTableRowData>>;
