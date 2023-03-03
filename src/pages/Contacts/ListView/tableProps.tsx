import { DataGrid } from "@mui/x-data-grid";
import { ContactAvatar } from "@components";
import { prettifyStr } from "@utils";
import type { Contact } from "@types";

type ColumnFieldKeys = "contact" | keyof Contact;
type ColumnConfig = React.ComponentProps<typeof DataGrid>["columns"][number];

const COLUMNS = Object.fromEntries(
  Object.entries(
    {
      contact: {
        headerName: "Contact",
        valueGetter: ({ row: contact }) => contact?.profile?.displayName || contact.handle,
        valueFormatter: ({ value }) => value, // <-- necessary for export/print on cols with renderCell
        renderCell: ({ row: contact }) => (
          <ContactAvatar contact={contact as any} viewContactOnClick={false} />
        )
      },
      handle: {
        headerName: "Handle"
      },
      email: {
        headerName: "Email"
      },
      phone: {
        headerName: "Phone",
        valueFormatter: ({ value }) => prettifyStr.phone(value),
        valueParser: (value) => prettifyStr.phone(value),
        minWidth: 125,
        headerAlign: "center",
        align: "center"
      }
    } as Record<ColumnFieldKeys, Partial<ColumnConfig>>
    // Map each column entry to an object with "field" and some defaults:
  ).map(([columnFieldKey, columnConfig]) => [
    columnFieldKey,
    {
      field: columnFieldKey,
      type: "string",
      editable: false,
      flex: 1,
      minWidth: columnConfig.type === "date" ? 100 : columnConfig.type === "dateTime" ? 160 : 150,
      maxWidth: 600,
      ...columnConfig // <-- explicit configs override above defaults
    }
  ])
) as Record<ColumnFieldKeys, ColumnConfig>;

export const contactTableProps: Omit<React.ComponentProps<typeof DataGrid>, "rows"> = {
  columns: Object.values(COLUMNS)
};
