import { styled, alpha } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { INVOICE_STATUSES } from "@/types/Invoice";
import { WORK_ORDER_STATUSES } from "@/types/WorkOrder";
import { SmallWidgetLayout } from "../SmallWidgetLayout";
import { dashboardPageClassNames as classNames } from "../classNames";
import type { WorkOrderStatus, InvoiceStatus } from "@graphql/types";

export const StatusCountWidget = <
  CoreItemTypeName extends "Work Orders" | "Invoices",
  CoreItemStatus extends WorkOrderStatus | InvoiceStatus = CoreItemTypeName extends "Work Orders"
    ? WorkOrderStatus
    : InvoiceStatus
>({
  itemTypeLabel,
  statusIcons,
  numCreatedByUserByStatus,
  numAssignedToUserByStatus,
  orderedStatuses = itemTypeLabel === "Work Orders"
    ? WORK_ORDER_STATUSES
    : (INVOICE_STATUSES as any), // <-- ignore the "could be instantiated with a different sub-type" error
}: StatusCountWidgetProps<CoreItemTypeName, CoreItemStatus>) => (
  <SmallWidgetLayout header={`${itemTypeLabel} by Status`}>
    <StyledDiv>
      {/* HEADER ROW */}

      <div className={`${classNames.statusWidgetRow} ${classNames.statusWidgetHeaderRow}`}>
        <Text className={classNames.statusWidgetMiddleCol} style={{ flexGrow: 1 }}>
          Sent
        </Text>
        <Text className={classNames.statusWidgetRightCol}>Received</Text>
      </div>

      {/* STATUS ROWS */}

      {orderedStatuses.map((status) => (
        <div className={classNames.statusWidgetRow} key={`StatusCountWidget:${status}`}>
          {/* COL 1 - STATUS ICON+LABEL */}

          <div className={classNames.statusWidgetLeftCol}>
            {statusIcons[status]}
            <Text style={{ marginTop: "0.1rem" }}>{prettifyStatus(status)}</Text>
          </div>

          {/* COL 2 - NUMBER SENT */}

          <div className={classNames.statusWidgetMiddleCol}>
            <Text>{numCreatedByUserByStatus[status].toLocaleString()}</Text>
          </div>

          {/* COL 3 - NUMBER RECEIVED */}

          <div className={classNames.statusWidgetRightCol}>
            <Text>{numAssignedToUserByStatus[status].toLocaleString()}</Text>
          </div>
        </div>
      ))}
    </StyledDiv>
  </SmallWidgetLayout>
);

const prettifyStatus = (status: string) => {
  return status
    .split("_")
    .map((subStr) => `${subStr.charAt(0).toUpperCase()}${subStr.slice(1).toLowerCase()}`)
    .join(" ");
};

const StyledDiv = styled("div")(({ theme }) => ({
  padding: "0 1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  [`& > .${classNames.statusWidgetRow}`]: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",

    // Header row
    [`&.${classNames.statusWidgetHeaderRow}`]: {
      justifyContent: "flex-end",
      paddingBottom: "0.25rem",

      [`& .${typographyClasses.root}`]: {
        fontSize: "1rem",
        fontWeight: "normal",
        color: theme.palette.secondary.main,
      },
    },

    // Other status rows:
    [`&:not(.${classNames.statusWidgetHeaderRow})`]: {
      justifyContent: "space-between",
      flexGrow: 1,
      borderWidth: "1px 0 0 0",
      borderStyle: "solid",
      borderColor: theme.palette.divider,

      [`& .${typographyClasses.root}`]: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginTop: "0.2rem",
      },
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
      [`&.${classNames.statusWidgetLeftCol}`]: {
        minWidth: "3rem",
        flexGrow: 1,
        "& svg": {
          marginRight: "0.75rem",
        },
        [`& .${typographyClasses.root}`]: {
          fontSize: "1rem",
          fontWeight: "normal",
        },
      },

      // middle and right columns
      [`&.${classNames.statusWidgetMiddleCol}, &.${classNames.statusWidgetRightCol}`]: {
        minWidth: "5rem",
        width: "20%",
        textAlign: "right",
        justifyContent: "flex-end",
      },
    },
  },
}));

export type StatusCountWidgetProps<
  CoreItemTypeName extends "Work Orders" | "Invoices",
  CoreItemStatus extends WorkOrderStatus | InvoiceStatus = CoreItemTypeName extends "Work Orders"
    ? WorkOrderStatus
    : InvoiceStatus
> = {
  itemTypeLabel: CoreItemTypeName;
  statusIcons: Record<CoreItemStatus, React.ReactNode>;
  numCreatedByUserByStatus: Record<CoreItemStatus, number>;
  numAssignedToUserByStatus: Record<CoreItemStatus, number>;
  orderedStatuses?: Array<CoreItemStatus> | ReadonlyArray<CoreItemStatus>; // <-- can provide to force a specific order
};
