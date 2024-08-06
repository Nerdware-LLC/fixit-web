import { styled, alpha } from "@mui/material/styles";
import Text, { typographyClasses } from "@mui/material/Typography";
import { INVOICE_STATUSES } from "@/types/Invoice.js";
import { WORK_ORDER_STATUSES } from "@/types/WorkOrder.js";
import { SmallWidgetLayout } from "./SmallWidgetLayout.jsx";
import { widgetClassNames } from "./classNames.js";

export const StatusCountWidget = ({
  itemTypeLabel,
  statusIcons,
  numCreatedByUserByStatus,
  numAssignedToUserByStatus,
  orderedStatuses = itemTypeLabel === "Work Orders" ? WORK_ORDER_STATUSES : INVOICE_STATUSES,
}: StatusCountWidgetProps) => (
  <SmallWidgetLayout header={`${itemTypeLabel} by Status`}>
    <StyledDiv>
      {/* HEADER ROW */}

      <div
        className={`${widgetClassNames.statusWidgetRow} ${widgetClassNames.statusWidgetHeaderRow}`}
      >
        <Text className={widgetClassNames.statusWidgetMiddleCol} style={{ flexGrow: 1 }}>
          Sent
        </Text>
        <Text className={widgetClassNames.statusWidgetRightCol}>Received</Text>
      </div>

      {/* STATUS ROWS */}

      {orderedStatuses.map((status) => (
        <div className={widgetClassNames.statusWidgetRow} key={status}>
          {/* COL 1 - STATUS ICON+LABEL */}

          <div className={widgetClassNames.statusWidgetLeftCol}>
            {statusIcons[status]}
            <Text style={{ marginTop: "0.1rem" }}>{prettifyStatus(status)}</Text>
          </div>

          {/* COL 2 - NUMBER SENT */}

          <div className={widgetClassNames.statusWidgetMiddleCol}>
            <Text>{numCreatedByUserByStatus[status].toLocaleString()}</Text>
          </div>

          {/* COL 3 - NUMBER RECEIVED */}

          <div className={widgetClassNames.statusWidgetRightCol}>
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

const StyledDiv = styled("div")(({ theme: { palette } }) => ({
  padding: "0 1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  [`& > .${widgetClassNames.statusWidgetRow}`]: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",

    // Header row
    [`&.${widgetClassNames.statusWidgetHeaderRow}`]: {
      justifyContent: "flex-end",
      paddingBottom: "0.25rem",

      [`& .${typographyClasses.root}`]: {
        fontSize: "1rem",
        fontWeight: "normal",
        color: palette.secondary.main,
      },
    },

    // Other status rows:
    [`&:not(.${widgetClassNames.statusWidgetHeaderRow})`]: {
      justifyContent: "space-between",
      flexGrow: 1,
      borderWidth: "1px 0 0 0",
      borderStyle: "solid",
      borderColor: palette.divider,

      [`& .${typographyClasses.root}`]: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginTop: "0.2rem",
      },
    },

    // "status rows" child columns: left / middle / right

    "& > *": {
      // Styles applied to all columns:
      color: alpha(palette.text.primary, 0.8),
      whiteSpace: "nowrap",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",

      // left col
      [`&.${widgetClassNames.statusWidgetLeftCol}`]: {
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
      [`&.${widgetClassNames.statusWidgetMiddleCol}, &.${widgetClassNames.statusWidgetRightCol}`]: {
        minWidth: "5rem",
        width: "20%",
        textAlign: "right",
        justifyContent: "flex-end",
      },
    },
  },
}));

export type StatusCountWidgetProps = {
  itemTypeLabel: string;
  statusIcons: Record<string, React.ReactNode>;
  numCreatedByUserByStatus: Record<string, number>;
  numAssignedToUserByStatus: Record<string, number>;
  /** Optional - Override the default order of status rows. */
  orderedStatuses?: Array<string> | ReadonlyArray<string>;
};
