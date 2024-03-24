import { ContactAvatar } from "@/components/Avatar/ContactAvatar";
import { getDataGridColDefs } from "@/components/DataGrid/helpers/getDataGridColDefs";
import { fmt } from "@/utils/formatters";
import type { Contact } from "@/graphql/types";
import type { DataGridProps } from "@mui/x-data-grid";

/**
 * The type of data provided in the ContactsListView table.
 */
export type ContactTableRowData = Contact;

const COLUMNS = getDataGridColDefs<
  ContactTableRowData,
  {
    omit: "__typename" | "id" | "profile" | "createdAt" | "updatedAt";
    add: { contact: Contact };
  }
>({
  contact: {
    headerName: "Contact",
    valueGetter: ({ row: contact }) => contact.profile.displayName,
    renderCell: ({ row: contact }) => (
      <ContactAvatar contact={contact} viewContactOnClick={false} />
    ),
    flex: 1,
  },
  handle: {
    headerName: "Handle",
    flex: 1,
  },
  email: {
    headerName: "Email",
    flex: 1,
  },
  phone: {
    headerName: "Phone",
    valueFormatter: ({ value }) => (value ? fmt.prettifyPhoneNum(value) : ""),
    valueParser: (value) => (value ? fmt.prettifyPhoneNum(value) : ""),
    flex: 1,
    minWidth: 125,
    headerAlign: "center",
    align: "center",
  },
});

export const contactTableProps = {
  columns: Object.values(COLUMNS),
} as const satisfies Partial<DataGridProps<ContactTableRowData>>;
