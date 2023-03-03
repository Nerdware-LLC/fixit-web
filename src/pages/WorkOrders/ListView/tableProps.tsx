import { DataGrid } from "@mui/x-data-grid";
import { WorkOrderCategoryChip } from "@components";
import { prettifyStr, getDateAndTime } from "@utils";
import type { WorkOrder } from "@types";

type ColumnFieldKeys =
  | "listName"
  | Exclude<keyof WorkOrder, "location">
  | keyof WorkOrder["location"];
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
        valueGetter: ({ row }) => row?.assignedTo?.profile?.displayName || row?.assignedTo?.handle,
        flex: 1,
        minWidth: 175
      },
      streetLine1: {
        headerName: "Street Address",
        valueGetter: ({ row }) => row.location.streetLine1,
        flex: 1,
        minWidth: 175
      },
      streetLine2: {
        headerName: "Street Line 2",
        valueGetter: ({ row }) => row.location?.streetLine2,
        flex: 0.75
      },
      city: {
        headerName: "City",
        valueGetter: ({ row }) => row.location.city,
        flex: 0.75
      },
      region: {
        headerName: "State", // TODO "region" vs "state" col name, use state only in US
        valueGetter: ({ row }) => row.location.region,
        flex: 0.75,
        minWidth: 125
      },
      country: {
        headerName: "Country",
        valueGetter: ({ row }) => row.location?.country,
        flex: 0.5,
        minWidth: 80
      },
      status: {
        headerName: "Status",
        valueGetter: ({ row }) => row.status.replace(/_/g, " "),
        flex: 0.5,
        minWidth: 115,
        headerAlign: "center",
        align: "center"
      },
      priority: {
        headerName: "Priority",
        flex: 0.5,
        minWidth: 115,
        headerAlign: "center",
        align: "center"
      },
      category: {
        headerName: "Category",
        renderCell: ({ value }) =>
          value && <WorkOrderCategoryChip category={value} style={{ marginBottom: "0.15rem" }} />,
        valueFormatter: ({ value }) => value, // <-- necessary for export/print on cols with renderCell
        flex: 0.75,
        minWidth: 160,
        headerAlign: "center",
        align: "center"
      },
      description: {
        headerName: "Description"
      },
      entryContact: {
        headerName: "Name"
      },
      entryContactPhone: {
        headerName: "Phone",
        valueFormatter: ({ value }) => prettifyStr.phone(value),
        valueParser: (value) => prettifyStr.phone(value),
        minWidth: 125,
        headerAlign: "center",
        align: "center"
      },
      dueDate: {
        headerName: "Due Date",
        type: "date",
        headerAlign: "center",
        align: "center"
      },
      scheduledDateTime: {
        headerName: "Scheduled Date/Time",
        type: "dateTime",
        valueFormatter: ({ value }) => getDateAndTime(value)
      },
      contractorNotes: {
        headerName: "Notes"
      },
      createdAt: {
        headerName: "Created",
        type: "dateTime",
        valueFormatter: ({ value }) => getDateAndTime(value)
      },
      updatedAt: {
        headerName: "Last Updated",
        type: "dateTime",
        valueFormatter: ({ value }) => getDateAndTime(value)
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

export const workOrderTableProps: Omit<React.ComponentProps<typeof DataGrid>, "rows"> = {
  columns: Object.values(COLUMNS),
  experimentalFeatures: { columnGrouping: true },
  columnGroupingModel: [
    {
      groupId: "Address",
      children: [
        COLUMNS.streetLine1,
        COLUMNS.streetLine2,
        COLUMNS.city,
        COLUMNS.region,
        COLUMNS.country
      ].map(({ field }) => ({ field }))
    },
    {
      groupId: "Entry Contact",
      children: [COLUMNS.entryContact, COLUMNS.entryContactPhone].map(({ field }) => ({ field }))
    }
  ]
};
