import { authenticatedUserStore } from "@/stores/authenticatedUserStore.js";
import { PayInvoiceButton } from "./PayInvoiceButton.jsx";
import { UpdateInvoiceButton } from "./UpdateInvoiceButton.jsx";
import type { Invoice } from "@/types/graphql.js";
import type { ButtonProps } from "@mui/material/Button";

// TODO Additional buttons/actions: CANCEL/DELETE invoice

export const InvoiceItemViewHeader = ({ invoice }: { invoice: Invoice }) => {
  const authenticatedUser = authenticatedUserStore.useSubToStore();

  if (!authenticatedUser || invoice.status === "CLOSED") return null;

  return (
    <>
      {invoice.createdBy.id === authenticatedUser.id && (
        <UpdateInvoiceButton invoice={invoice} {...sharedProps} />
      )}
      {invoice.assignedTo.id === authenticatedUser.id && (
        <PayInvoiceButton invoice={invoice} {...sharedProps} />
      )}
    </>
  );
};

const sharedProps: Pick<ButtonProps, "variant" | "style"> = {
  variant: "contained",
  style: { height: "2rem", fontSize: "1rem", borderRadius: "1.5rem" },
};
