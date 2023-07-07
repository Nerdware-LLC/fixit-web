import { ContactAvatar } from "@components/Avatar/ContactAvatar";
import { prettifyStr } from "@utils/prettifyStr";
import type { Contact } from "@graphql/types";
import type { DataGridProps, GridColDef } from "@mui/x-data-grid";
import type { Except } from "type-fest";

type ColumnFieldKeys = "contact" | keyof Contact;

const COLUMNS = Object.fromEntries(
  Object.entries(
    {
      contact: {
        headerName: "Contact",
        valueGetter: ({ row: contact }) => contact?.profile?.displayName || contact.handle,
        valueFormatter: ({ value }) => value, // <-- necessary for export/print on cols with renderCell
        renderCell: ({ row: contact }) => (
          <ContactAvatar contact={contact as any} viewContactOnClick={false} />
        ),
      },
      handle: {
        headerName: "Handle",
      },
      email: {
        headerName: "Email",
      },
      phone: {
        headerName: "Phone",
        valueFormatter: ({ value }) => prettifyStr.phone(value),
        valueParser: (value) => prettifyStr.phone(value),
        minWidth: 125,
        headerAlign: "center",
        align: "center",
      },
    } as Record<ColumnFieldKeys, Partial<GridColDef>>
    // Map each column entry to an object with "field" and some defaults:
  ).map(([columnFieldKey, GridColDef]) => [
    columnFieldKey,
    {
      field: columnFieldKey,
      type: "string",
      editable: false,
      flex: 1,
      minWidth: GridColDef.type === "date" ? 100 : GridColDef.type === "dateTime" ? 160 : 150,
      maxWidth: 600,
      ...GridColDef, // <-- explicit configs override above defaults
    },
  ])
) as Record<ColumnFieldKeys, GridColDef>;

export const contactTableProps: Except<DataGridProps, "rows"> = {
  columns: Object.values(COLUMNS),
};
