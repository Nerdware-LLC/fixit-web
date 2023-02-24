import { UpdateInvoiceButton } from "./UpdateInvoiceButton";
import { PayInvoiceButton } from "./PayInvoiceButton";
import type Button from "@mui/material/Button";
import type { Invoice } from "@types";

export const InvoiceItemViewHeader = ({
  invoice,
  isItemOwnedByUser
}: {
  invoice: Invoice;
  isItemOwnedByUser: boolean;
}) => {
  return (
    <>
      {invoice.status !== "CLOSED" &&
        (isItemOwnedByUser ? (
          <UpdateInvoiceButton invoice={invoice} {...sharedProps} />
        ) : (
          <PayInvoiceButton invoice={invoice} {...sharedProps} />
        ))}
    </>
  );
};

const sharedProps: Partial<React.ComponentProps<typeof Button>> = {
  variant: "contained",
  style: { height: "2rem", fontSize: "1rem" }
};
