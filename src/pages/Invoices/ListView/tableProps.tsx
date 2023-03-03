import { DataGrid } from "@mui/x-data-grid";
import { Link } from "@components";
import { getDateAndTime, formatNum } from "@utils";
import type { Invoice } from "@types";

type ColumnFieldKeys = "listName" | keyof Invoice;
type ColumnConfig = React.ComponentProps<typeof DataGrid>["columns"][number];

const COLUMNS = Object.fromEntries(
  Object.entries(
    {
      listName: {
        headerName: "Sent/Received",
        valueGetter: ({ row }) => (row.isItemOwnedByUser === true ? "Sent" : "Received"),
        minWidth: 115,
        headerAlign: "left",
        align: "center"
      },
      createdBy: {
        headerName: "Created By",
        valueGetter: ({ row }) => row.createdBy.profile?.displayName || row.createdBy.handle,
        flex: 1,
        minWidth: 175
      },
      assignedTo: {
        headerName: "Assigned To",
        valueGetter: ({ row }) => row.assignedTo.profile?.displayName || row.assignedTo.handle,
        flex: 1,
        minWidth: 175
      },
      amount: {
        headerName: "Amount",
        valueFormatter: ({ value }) => formatNum.toCurrencyStr(value),
        flex: 0.5,
        minWidth: 100,
        headerAlign: "right",
        align: "right"
      },
      status: {
        headerName: "Status",
        flex: 0.5,
        minWidth: 115,
        headerAlign: "center",
        align: "center"
      },
      workOrder: {
        headerName: "Work Order",
        flex: 0.5,
        align: "center",
        headerAlign: "center",
        valueGetter: ({ row }) => row?.workOrder?.id,
        valueFormatter: ({ value }) => value, // <-- necessary for export/print on cols with renderCell
        renderCell: ({ value: workOrderID, row }) =>
          workOrderID && (
            <Link
              to={`/home/workorders/${encodeURIComponent(workOrderID)}`}
              onClick={(event: React.MouseEvent<HTMLAnchorElement>) => event.stopPropagation()}
              state={{
                isItemOwnedByUser: row.isItemOwnedByUser // Invoice INBOX = WorkOrder SENT
              }}
              style={{ fontSize: "0.925rem", lineHeight: "1.25rem" }}
            >
              View Work Order
            </Link>
          )
      },
      createdAt: {
        headerName: "Created",
        type: "dateTime",
        valueFormatter: ({ value }) => getDateAndTime(value),
        flex: 1
      },
      updatedAt: {
        headerName: "Last Updated",
        type: "dateTime",
        valueFormatter: ({ value }) => getDateAndTime(value),
        flex: 1
      }
    } as Record<ColumnFieldKeys, Partial<ColumnConfig>>
    // Map each column entry to an object with "field" and some defaults:
  ).map(([columnFieldKey, columnConfig]) => [
    columnFieldKey,
    {
      field: columnFieldKey,
      type: "string",
      editable: false,
      minWidth: columnConfig.type === "date" ? 100 : columnConfig.type === "dateTime" ? 160 : 150,
      maxWidth: 600,
      ...columnConfig // <-- explicit configs override above defaults
    }
  ])
) as Record<ColumnFieldKeys, ColumnConfig>;

export const invoiceTableProps: Omit<React.ComponentProps<typeof DataGrid>, "rows"> = {
  columns: Object.values(COLUMNS)
};
