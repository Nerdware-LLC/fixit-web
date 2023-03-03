import { styled, alpha } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import { SmallWidgetLayout } from "../SmallWidgetLayout";
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
  <SmallWidgetLayout header={`${itemTypeLabel}: Status Overview`}>
    <StatusRowsContainer>
      {/* HEADER ROW */}

      <div className="dashboard-status-widget-row dashboard-status-widget-header-row">
        <Text className="dashboard-status-widget-middle-col" style={{ flexGrow: 1 }}>
          Sent
        </Text>
        <Text className="dashboard-status-widget-right-col">Received</Text>
      </div>

      {/* STATUS ROWS */}

      {statuses.map((status) => (
        <div className="dashboard-status-widget-row" key={`StatusCountWidget:${status}`}>
          {/* COL 1 - STATUS ICON+LABEL */}

          <div className="dashboard-status-widget-left-col">
            {statusIcons[status]}
            <Text style={{ marginTop: "0.1rem" }}>{prettifyStatus(status)}</Text>
          </div>

          {/* COL 2 - NUMBER SENT */}

          <div className="dashboard-status-widget-middle-col">
            <Text>{numCreatedByUserByStatus[status as keyof typeof numCreatedByUserByStatus]}</Text>
          </div>

          {/* COL 3 - NUMBER RECEIVED */}

          <div className="dashboard-status-widget-right-col">
            <Text>
              {numAssignedToUserByStatus[status as keyof typeof numAssignedToUserByStatus]}
            </Text>
          </div>
        </div>
      ))}
    </StatusRowsContainer>
  </SmallWidgetLayout>
);

const prettifyStatus = (status: string) => {
  return status
    .split("_")
    .map((subStr) => `${subStr.charAt(0).toUpperCase()}${subStr.slice(1).toLowerCase()}`)
    .join(" ");
};

const StatusRowsContainer = styled("div")(({ theme }) => ({
  padding: "0 1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  "& > .dashboard-status-widget-row": {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",

    // Header row
    "&.dashboard-status-widget-header-row": {
      justifyContent: "flex-end",
      paddingBottom: "0.25rem",
      "& .MuiTypography-root": {
        fontSize: "1rem",
        fontWeight: "normal",
        color: theme.palette.secondary.main
      }
    },

    // Other status rows:
    "&:not(.dashboard-status-widget-header-row)": {
      justifyContent: "space-between",
      flexGrow: 1,
      borderWidth: "1px 0 0 0",
      borderStyle: "solid",
      borderColor: theme.palette.divider,
      "& .MuiTypography-root": {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginTop: "0.2rem"
      }
    },

    // "status rows" child columns: left / middle / right

    "& > *": {
      // Styles applied to all columns:
      color: alpha(theme.palette.text.primary, 0.8),
      whiteSpace: "nowrap",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",

      // left col
      "&.dashboard-status-widget-left-col": {
        minWidth: "3rem",
        flexGrow: 1,
        "& svg": {
          marginRight: "0.75rem"
        },
        "& .MuiTypography-root": {
          fontSize: "1rem",
          fontWeight: "normal"
        }
      },

      // middle and right columns
      "&.dashboard-status-widget-middle-col, &.dashboard-status-widget-right-col": {
        minWidth: "5rem",
        width: "20%",
        textAlign: "right",
        justifyContent: "flex-end"
      }
    }
  }
}));
