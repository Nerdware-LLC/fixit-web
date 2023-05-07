import { ContactAvatar } from "@components/Avatar/ContactAvatar";
import { WorkOrderCategoryChip } from "@components/Chips/WorkOrderCategoryChip";
import { getDateAndTime } from "@utils/dateTime";
import { prettifyStr } from "@utils/prettifyStr";
import type { WorkOrder } from "@graphql/types";
import type { DataGridProps, GridColDef } from "@mui/x-data-grid";

type ColumnFieldKeys =
  | "listName"
  | Exclude<keyof WorkOrder, "location">
  | keyof WorkOrder["location"];

const COLUMNS = Object.fromEntries(
  Object.entries(
    {
      listName: {
        headerName: "Sent/Received",
        valueGetter: ({ row: wo }) => (wo.isItemOwnedByUser === true ? "Sent" : "Received"),
        minWidth: 115,
        headerAlign: "left",
        align: "center",
      },
      createdBy: {
        headerName: "Created By",
        valueGetter: ({ row: wo }) => wo.createdBy.profile?.displayName || wo.createdBy.handle,
        valueFormatter: ({ value }) => value, // <-- necessary for export/print on cols with renderCell
        renderCell: ({ row: wo }) => (
          <ContactAvatar contact={wo.createdBy as any} viewContactOnClick={false} />
        ),
        flex: 1,
        minWidth: 175,
      },
      assignedTo: {
        headerName: "Assigned To",
        valueGetter: ({ row: wo }) =>
          wo?.assignedTo?.profile?.displayName || wo?.assignedTo?.handle,
        valueFormatter: ({ value }) => value, // <-- necessary for export/print on cols with renderCell
        renderCell: ({ row: wo }) =>
          wo?.assignedTo && (
            <ContactAvatar contact={wo.assignedTo as any} viewContactOnClick={false} />
          ),
        flex: 1,
        minWidth: 175,
      },
      streetLine1: {
        headerName: "Street Address",
        valueGetter: ({ row }) => row.location.streetLine1,
        flex: 1,
        minWidth: 175,
      },
      streetLine2: {
        headerName: "Street Line 2",
        valueGetter: ({ row: wo }) => wo.location?.streetLine2,
        flex: 0.75,
      },
      city: {
        headerName: "City",
        valueGetter: ({ row: wo }) => wo.location.city,
        flex: 0.75,
      },
      region: {
        headerName: "State", // TODO "region" vs "state" col name, use state only in US
        valueGetter: ({ row: wo }) => wo.location.region,
        flex: 0.75,
        minWidth: 125,
      },
      country: {
        headerName: "Country",
        valueGetter: ({ row: wo }) => wo.location?.country,
        flex: 0.5,
        minWidth: 80,
      },
      status: {
        headerName: "Status",
        valueGetter: ({ row: wo }) => wo.status.replace(/_/g, " "),
        flex: 0.5,
        minWidth: 115,
        headerAlign: "center",
        align: "center",
      },
      priority: {
        headerName: "Priority",
        flex: 0.5,
        minWidth: 115,
        headerAlign: "center",
        align: "center",
      },
      category: {
        headerName: "Category",
        renderCell: ({ value }) =>
          value && <WorkOrderCategoryChip category={value} style={{ marginBottom: "0.15rem" }} />,
        valueFormatter: ({ value }) => value, // <-- necessary for export/print on cols with renderCell
        flex: 0.75,
        minWidth: 160,
        headerAlign: "center",
        align: "center",
      },
      description: {
        headerName: "Description",
      },
      entryContact: {
        headerName: "Name",
      },
      entryContactPhone: {
        headerName: "Phone",
        valueFormatter: ({ value }) => prettifyStr.phone(value),
        valueParser: (value) => prettifyStr.phone(value),
        minWidth: 125,
        headerAlign: "center",
        align: "center",
      },
      dueDate: {
        headerName: "Due Date",
        type: "date",
        headerAlign: "center",
        align: "center",
      },
      scheduledDateTime: {
        headerName: "Scheduled Date/Time",
        type: "dateTime",
        valueFormatter: ({ value }) => getDateAndTime(value),
      },
      contractorNotes: {
        headerName: "Notes",
      },
      createdAt: {
        headerName: "Created",
        type: "dateTime",
        valueFormatter: ({ value }) => getDateAndTime(value),
      },
      updatedAt: {
        headerName: "Last Updated",
        type: "dateTime",
        valueFormatter: ({ value }) => getDateAndTime(value),
      },
    } as Record<ColumnFieldKeys, Partial<GridColDef>>
    // Map each column entry to an object with "field" and some defaults:
  ).map(([columnFieldKey, columnConfig]) => [
    columnFieldKey,
    {
      field: columnFieldKey,
      type: "string",
      editable: false,
      minWidth: columnConfig.type === "date" ? 100 : columnConfig.type === "dateTime" ? 160 : 150,
      maxWidth: 600,
      ...columnConfig, // <-- explicit configs override above defaults
    },
  ])
) as Record<ColumnFieldKeys, GridColDef>;

export const workOrderTableProps: Omit<DataGridProps, "rows"> = {
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
        COLUMNS.country,
      ].map(({ field }) => ({ field })),
    },
    {
      groupId: "Entry Contact",
      children: [COLUMNS.entryContact, COLUMNS.entryContactPhone].map(({ field }) => ({ field })),
    },
  ],
};
