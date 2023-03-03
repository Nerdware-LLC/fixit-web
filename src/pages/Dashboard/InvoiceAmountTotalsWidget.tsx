import Box from "@mui/material/Box";
import Text from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import { formatNum } from "@utils";
import { useDashboardDataContext } from "./DashboardDataContext";
import { SmallWidgetLayout } from "./SmallWidgetLayout";
import React from "react";

// TODO Add btns which open Invoices table with filters: status=OPEN,listName=Inbox|Sent

export const InvoiceAmountTotalsWidget = () => {
  const {
    widgetData: {
      OpenInvoiceAmountTotals: { RECEIVABLE, PAYABLE }
    }
  } = useDashboardDataContext();

  return (
    <SmallWidgetLayout header="Open Invoices">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        {/* LEFT COLUMN */}

        <ColumnOfInvoiceStats
          header="Receivable"
          caption="Invoices sent"
          icon={<SendIcon />}
          total={RECEIVABLE.TOTAL}
          average={RECEIVABLE.AVERAGE}
        />

        <Divider orientation="vertical" style={{ margin: "0 clamp(0.5rem, 5%, 1.5rem)" }} />

        {/* RIGHT COLUMN */}

        <ColumnOfInvoiceStats
          header="Payable"
          caption="Invoices received"
          icon={<InboxIcon />}
          total={PAYABLE.TOTAL}
          average={PAYABLE.AVERAGE}
        />
      </div>
    </SmallWidgetLayout>
  );
};

const ColumnOfInvoiceStats = ({
  header,
  caption,
  icon,
  total,
  average
}: {
  header: "Receivable" | "Payable";
  caption: string;
  icon: React.ReactNode;
  total: number;
  average: number;
}) => (
  <Box
    className="invoice-totals-widget-col-container"
    style={{
      height: "100%",
      width: "calc(50% - 1rem)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
    <Text color="secondary">{header}</Text>
    <Box
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}
      sx={{
        "& svg": {
          fontSize: "1.25rem",
          opacity: 0.4
        }
      }}
    >
      {icon}
      <Text
        variant="caption"
        color="grey"
        style={{ margin: "0.2rem 0 0 0.5rem", whiteSpace: "nowrap" }}
      >
        {caption}
      </Text>
    </Box>
    <div
      style={{
        flexGrow: 1,
        width: "100%",
        padding: "1rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly"
      }}
    >
      <InvoiceStat label="Total" amount={total} />
      <Divider style={{ minWidth: "100%" }} />
      <InvoiceStat label="Average" amount={average} />
    </div>
  </Box>
);

const InvoiceStat = ({ label, amount }: { label: "Total" | "Average"; amount: number }) => (
  <Box
    className="invoice-totals-widget-stat"
    style={{
      width: "100%",
      padding: "0.5rem clamp(0.5rem, 5%, 5rem)",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-end"
    }}
  >
    <Text
      style={{
        fontSize: "0.925rem",
        fontWeight: "100",
        lineHeight: "1.1rem",
        opacity: 0.8
      }}
    >
      {label}
    </Text>
    <Text
      style={{
        /* The below width ensures "Total" and "Average" always wrap/unwrap
        together (the 8.15 figure accounts for difference in char length).*/
        width: label === "Total" ? "8.150625rem" : "6.925rem",
        maxWidth: "100%",
        fontSize: "1.35rem",
        fontWeight: "bold",
        lineHeight: "1.5rem",
        marginLeft: "auto",
        textAlign: "right"
      }}
    >
      {formatNum.toCurrencyStr(amount).slice(0, -3)}
    </Text>
  </Box>
);
