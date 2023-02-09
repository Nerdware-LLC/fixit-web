import { styled, alpha } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import type { WorkOrder, Invoice } from "@types";

// TODO Ensure status-count numbers print like 1,000 instead of 1000

export const StatusCountWidget = <
  Label extends "Work Orders" | "Invoices",
  T extends WorkOrder | Invoice = Label extends "Work Orders" ? WorkOrder : Invoice
>({
  itemTypeLabel,
  statusIcons,
  statuses = Object.keys(statusIcons) as ReadonlyArray<T["status"]>,
  numCreatedByUserByStatus,
  numAssignedToUserByStatus
}: {
  itemTypeLabel: Label;
  statusIcons: Record<T["status"], React.ReactNode>;
  statuses?: ReadonlyArray<T["status"]>; // <-- can provide to force a specific order
  numCreatedByUserByStatus: Record<T["status"], number>;
  numAssignedToUserByStatus: Record<T["status"], number>;
}) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      minWidth: "15rem"
    }}
  >
    {/* WIDGET HEADER  */}

    <div style={{ height: "15%", minHeight: "2.5rem" }}>
      <Text
        style={{
          fontSize: "0.95rem",
          fontWeight: "bold",
          textAlign: "center",
          whiteSpace: "nowrap"
        }}
        sx={{ color: ({ palette }) => alpha(palette.text.primary, 0.75) }}
      >
        {`${itemTypeLabel}: Status Overview`}
      </Text>
    </div>

    {/* CONTAINER FOR ALL ROWS  */}

    <StatusRowsContainer>
      {/* HEADER ROW */}

      <div>
        <div style={{ flexGrow: 1 }}>
          <Text color="secondary">Sent</Text>
        </div>
        <div>
          <Text color="secondary">Received</Text>
        </div>
      </div>

      {/* STATUS ROWS */}

      {statuses.map((status) => (
        <div key={`Dashboard:StatusCountWidget:${itemTypeLabel}:${status}`}>
          {/* COL 1 - STATUS ICON+LABEL */}

          <div>
            {statusIcons[status]}
            <Text style={{ fontSize: "1rem", marginLeft: "0.75rem" }}>
              {prettifyStatus(status)}
            </Text>
          </div>

          {/* COL 2 - NUMBER SENT */}

          <div>
            <Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {numCreatedByUserByStatus[status as keyof typeof numCreatedByUserByStatus]}
            </Text>
          </div>

          {/* COL 3 - NUMBER RECEIVED */}

          <div>
            <Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {numAssignedToUserByStatus[status as keyof typeof numAssignedToUserByStatus]}
            </Text>
          </div>
        </div>
      ))}
    </StatusRowsContainer>
  </div>
);

const prettifyStatus = (status: string) => {
  return status
    .split("_")
    .map((subStr) => `${subStr.charAt(0).toUpperCase()}${subStr.slice(1).toLowerCase()}`)
    .join(" ");
};

const StatusRowsContainer = styled("div")(({ theme }) => ({
  height: "85%",
  width: "100%",
  padding: "0 1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  // All child divs are "status rows"
  "& > div": {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",

    // 1st status row:
    "&:first-of-type": {
      justifyContent: "flex-end",
      paddingBottom: "0.25rem"
    },

    // 2nd/3rd status rows:
    "&:not(:first-of-type)": {
      justifyContent: "space-between",
      flexGrow: 1,
      borderWidth: "1px 0 0 0",
      borderStyle: "solid",
      borderColor: theme.palette.divider
    },

    // "status rows" children are columns: left / middle / right

    // Every row has "middle" and "right" columns, but not every row has a "left"
    // column, so these child columns are selected using nth-last-of-type.

    // Styles applied to all left/middle/right columns:
    "& > div": {
      color: alpha(theme.palette.text.primary, 0.8),
      whiteSpace: "nowrap",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      // left column:
      "&:nth-last-of-type(3)": {
        minWidth: "3rem",
        flexGrow: 1
      },
      // middle and right columns:
      "&:not(:nth-last-of-type(3))": {
        minWidth: "5rem",
        width: "20%",
        textAlign: "right",
        justifyContent: "flex-end"
      }
    }
  }
}));
