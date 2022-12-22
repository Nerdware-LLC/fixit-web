import { styled } from "@mui/material/styles";
import { ItemDataDisplay } from "@layouts";
import { prettifyStr } from "@utils";
import { InvoiceProcessStepper } from "./InvoiceProcessStepper";
import type { Invoice } from "@types";

export const InvoiceScrollableDetails = ({
  invoice: { amount, status },
  isItemOwnedByUser
}: {
  invoice: Invoice;
  isItemOwnedByUser: boolean;
}) => {
  const prettyAmountStr = prettifyStr.currency(amount);

  return (
    <Row>
      <ItemDataDisplay
        label="AMOUNT"
        styles={{
          container: { height: "3rem" },
          labelContainer: { height: "0" }
        }}
      >
        <AmountH1>{prettyAmountStr}</AmountH1>
      </ItemDataDisplay>
      <div
        style={{
          paddingTop: "1.5rem",
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div style={{ width: "75%" }}>
          <InvoiceProcessStepper invoiceStatus={status} isItemOwnedByUser={isItemOwnedByUser} />
        </div>
      </div>
    </Row>
  );
};

// prettier-ignore
const AmountH1 = styled("h1")(({ theme }) => `
  font-size: 2.5rem;
  color: ${theme.palette.mode === "dark" ? "#85BB65" : theme.palette.success.dark};
`);

const Row = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0;
`;
