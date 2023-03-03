import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { useLottie } from "@components";
import { MUTATIONS, FRAGMENTS } from "@graphql";
import { logger } from "@utils";
import { InvoiceForm } from "./Form";
import { invoiceFormFieldHandlers, type InvoiceFormValues } from "./formFieldHandlers";
import type { WorkOrder } from "@types";

/**
 * - Prop `workOrderToInvoice` represents a WO to attach to the Invoice. Note
 *   that once a WO is attached to an Invoice, the WO can NOT be unattached,
 *   nor can the Invoice be re-assigned to some other recipient - the Invoice
 *   can only be cancelled/deleted.
 */
export const FormCreateInvoice = ({
  workOrderToInvoice = null
}: {
  workOrderToInvoice?: WorkOrder | null;
}) => {
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const nav = useNavigate();

  const [createInvoice] = useMutation(MUTATIONS.CREATE_INVOICE, {
    update(cache, { data: { createInvoice } }) {
      cache.modify({
        fields: {
          invoices(existingInvoices = []) {
            const newInvoiceRef = cache.writeFragment({
              data: createInvoice,
              fragment: FRAGMENTS.InvoiceWithWorkOrderFields
            });
            return [...existingInvoices, newInvoiceRef];
          }
        }
      });
    }
  });

  const handleSubmit = async (formValues: InvoiceFormValues) => {
    const invoice = invoiceFormFieldHandlers.getFormFieldsForMutation(formValues);

    // If no keys, then no need to run the mutation
    if (Object.keys(invoice).length >= 1) {
      await createInvoice({
        variables: {
          invoice
        }
      }).catch((err) => logger.error(err));
    }

    await playLottie();

    nav("/home/invoices");
  };

  return (
    <>
      <InvoiceForm
        onSubmit={handleSubmit}
        initialFormValues={{
          assignedTo: workOrderToInvoice?.createdBy?.id ?? "",
          workOrder: workOrderToInvoice?.id ?? null,
          amount: ""
        }}
      />
      {LottieView}
    </>
  );
};