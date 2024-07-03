import { ContactAvatar } from "@/components/Avatar/ContactAvatar.jsx";
import { WorkOrderCategoryChip } from "@/components/Chips/WorkOrderCategoryChip.jsx";
import { getDataGridColDefs } from "@/components/DataGrid/helpers/getDataGridColDefs.js";
import { prettifyPhoneNumStr } from "@/utils/formatters/phone.js";
import type { TableViewDataSetProp } from "@/layouts/CoreItemsListView/types.js";
import type { WorkOrder, Location } from "@/types/graphql.js";
import type { DataGridProps } from "@mui/x-data-grid";

/**
 * The type of data provided in the WorkOrdersListView table.
 *
 * > "dataSet" added in ./WorkOrdersListView
 */
export type WorkOrderTableRowData = WorkOrder & TableViewDataSetProp;

const COLUMNS = getDataGridColDefs<
  WorkOrderTableRowData,
  {
    omit: "__typename" | "id" | "checklist" | "location";
    add: Required<Omit<Location, "__typename">>;
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
    valueGetter: ({ row: wo }) => wo.createdBy.profile.displayName,
    renderCell: ({ row: wo }) => (
      <ContactAvatar contact={wo.createdBy} viewContactOnClick={false} />
    ),
    flex: 1,
    minWidth: 175,
  },
  assignedTo: {
    headerName: "Assigned To",
    valueGetter: ({ row: wo }) => wo.assignedTo?.profile.displayName,
    renderCell: ({ row: wo }) =>
      !!wo.assignedTo && <ContactAvatar contact={wo.assignedTo} viewContactOnClick={false} />,
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
    valueGetter: ({ row: wo }) => wo.location.streetLine2,
    flex: 0.75,
  },
  city: {
    headerName: "City",
    valueGetter: ({ row: wo }) => wo.location.city,
    flex: 0.75,
  },
  region: {
    headerName: "State",
    valueGetter: ({ row: wo }) => wo.location.region,
    flex: 0.75,
    minWidth: 125,
  },
  country: {
    headerName: "Country",
    valueGetter: ({ row: wo }) => wo.location.country,
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
      !!value && <WorkOrderCategoryChip category={value} style={{ marginBottom: "0.15rem" }} />,
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
    valueFormatter: ({ value }) => (value ? prettifyPhoneNumStr(value) : ""),
    valueParser: (value) => (value ? prettifyPhoneNumStr(value) : ""),
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
  },
  contractorNotes: {
    headerName: "Notes",
  },
  createdAt: {
    headerName: "Created",
    type: "dateTime",
  },
  updatedAt: {
    headerName: "Last Updated",
    type: "dateTime",
  },
});

export const workOrderTableProps = {
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
} satisfies Partial<DataGridProps<WorkOrderTableRowData>>;
