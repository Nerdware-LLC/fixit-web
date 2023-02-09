import { styled, alpha } from "@mui/material/styles";
import Text from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { formatNum } from "@utils";
import { useDashboardDataContext } from "./DashboardDataContext";

export const InvoiceAmountTotalsWidget = () => {
  const {
    widgetData: { OpenInvoiceAmountTotals }
  } = useDashboardDataContext();

  return (
    <div style={{ height: "100%", width: "100%", minWidth: "15rem" }}>
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
          Open Invoices
        </Text>
      </div>

      {/* WIDGET DATA CONTAINER */}

      <div
        style={{
          height: "85%",
          width: "100%",
          minWidth: "15rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      >
        <ColumnContainer style={{ paddingRight: "clamp(0.5rem, 5%, 1.5rem)" }}>
          <Text color="secondary">Receivable</Text>
          <Text variant="caption" color="grey" style={{ marginBottom: "1.5rem" }}>
            Invoices sent
          </Text>
          <StatRow label="Total" amount={OpenInvoiceAmountTotals.RECEIVABLE.TOTAL} />
          <StatRow label="Average" amount={OpenInvoiceAmountTotals.RECEIVABLE.AVERAGE} />
        </ColumnContainer>
        <Divider orientation="vertical" />
        <ColumnContainer style={{ paddingLeft: "clamp(0.5rem, 5%, 1.5rem)" }}>
          <Text color="secondary">Payable</Text>
          <Text variant="caption" color="grey" style={{ marginBottom: "1.5rem" }}>
            Invoices received
          </Text>
          <StatRow label="Total" amount={OpenInvoiceAmountTotals.PAYABLE.TOTAL} />
          <StatRow label="Average" amount={OpenInvoiceAmountTotals.PAYABLE.AVERAGE} />
        </ColumnContainer>
      </div>
    </div>
  );
};

const ColumnContainer = styled("div")(() => ({
  height: "100%",
  width: "50%",
  minWidth: "7.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}));

const StatRow = ({ label, amount }: { label: "Total" | "Average"; amount: number }) => {
  return (
    <StatRowContainer style={{ borderWidth: label === "Total" ? "0 0 1px 0" : "0" }}>
      <Text style={{ margin: "0 1rem 0 0", fontWeight: "100" }}>{label}:</Text>
      <Text
        style={{
          width: "5.5rem",
          margin: "0 1rem 0 0",
          fontSize: "1.1rem",
          fontWeight: "bold"
        }}
      >
        {formatNum.toCurrencyStr(amount)}
      </Text>
    </StatRowContainer>
  );
};

const StatRowContainer = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "0.5rem 0",
  textAlign: "right",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "flex-end",
  borderStyle: "solid",
  borderColor: theme.palette.divider
}));
