import { ContactAvatar } from "@/components/Avatar/ContactAvatar.jsx";
import { getDataGridColDefs } from "@/components/DataGrid/helpers/getDataGridColDefs.js";
import { prettifyPhoneNumStr } from "@/utils/formatters/phone.js";
import type { Contact } from "@/types/graphql.js";
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
    valueGetter: (_value, row) => row.profile.displayName,
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
    valueFormatter: (value) => (value ? prettifyPhoneNumStr(value) : ""),
    valueParser: (value) => (value ? prettifyPhoneNumStr(value) : ""),
    flex: 1,
    minWidth: 125,
    headerAlign: "center",
    align: "center",
  },
});

export const contactTableProps = {
  columns: Object.values(COLUMNS),
} as const satisfies Partial<DataGridProps<ContactTableRowData>>;
