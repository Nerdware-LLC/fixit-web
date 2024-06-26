import { PayInvoiceButton } from "./PayInvoiceButton.jsx";
import { UpdateInvoiceButton } from "./UpdateInvoiceButton.jsx";
import type { Invoice } from "@/types/graphql.js";
import type { ButtonProps } from "@mui/material/Button";

// TODO Additional buttons/actions: CANCEL/DELETE invoice

export const InvoiceItemViewHeader = ({
  invoice,
  isItemOwnedByUser,
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

const sharedProps: Pick<ButtonProps, "variant" | "style"> = {
  variant: "contained",
  style: { height: "2rem", fontSize: "1rem", borderRadius: "1.5rem" },
};
