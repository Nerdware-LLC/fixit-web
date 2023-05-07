import { ContactAvatar } from "@components/Avatar/ContactAvatar";
import { Link } from "@components/Navigation/Link";
import { getDateAndTime } from "@utils/dateTime";
import { formatNum } from "@utils/formatNum";
import type { Invoice } from "@graphql/types";
import type { DataGridProps, GridColDef } from "@mui/x-data-grid";

type ColumnFieldKeys = "listName" | keyof Invoice;

const COLUMNS = Object.fromEntries(
  Object.entries(
    {
      listName: {
        headerName: "Sent/Received",
        valueGetter: ({ row: inv }) => (inv.isItemOwnedByUser === true ? "Sent" : "Received"),
        minWidth: 115,
        headerAlign: "left",
        align: "center",
      },
      createdBy: {
        headerName: "Created By",
        valueGetter: ({ row: inv }) => inv.createdBy.profile?.displayName || inv.createdBy.handle,
        valueFormatter: ({ value }) => value, // <-- necessary for export/print on cols with renderCell
        renderCell: ({ row: inv }) => (
          <ContactAvatar contact={inv.createdBy as any} viewContactOnClick={false} />
        ),
        flex: 1,
        minWidth: 175,
      },
      assignedTo: {
        headerName: "Assigned To",
        valueGetter: ({ row: inv }) => inv.assignedTo.profile?.displayName || inv.assignedTo.handle,
        valueFormatter: ({ value }) => value, // <-- necessary for export/print on cols with renderCell
        renderCell: ({ row: inv }) => (
          <ContactAvatar contact={inv.assignedTo as any} viewContactOnClick={false} />
        ),
        flex: 1,
        minWidth: 175,
      },
      amount: {
        headerName: "Amount",
        valueFormatter: ({ value }) => formatNum.toCurrencyStr(value),
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
        valueFormatter: ({ value }) => value, // <-- necessary for export/print on cols with renderCell
        renderCell: ({ value: workOrderID, row: inv }) =>
          workOrderID && (
            <Link
              to={`/home/workorders/${encodeURIComponent(workOrderID)}`}
              state={{ isItemOwnedByUser: !inv.isItemOwnedByUser }} // WO ownership is always the inverse of INV ownership
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
        valueFormatter: ({ value }) => getDateAndTime(value),
        flex: 1,
      },
      updatedAt: {
        headerName: "Last Updated",
        type: "dateTime",
        valueFormatter: ({ value }) => getDateAndTime(value),
        flex: 1,
      },
    } as Record<ColumnFieldKeys, Partial<GridColDef>>
    // Map each column entry to an object with "field" and some defaults:
  ).map(([columnFieldKey, GridColDef]) => [
    columnFieldKey,
    {
      field: columnFieldKey,
      type: "string",
      editable: false,
      minWidth: GridColDef.type === "date" ? 100 : GridColDef.type === "dateTime" ? 160 : 150,
      maxWidth: 600,
      ...GridColDef, // <-- explicit configs override above defaults
    },
  ])
) as Record<ColumnFieldKeys, GridColDef>;

export const invoiceTableProps: Omit<DataGridProps, "rows"> = {
  columns: Object.values(COLUMNS),
};
