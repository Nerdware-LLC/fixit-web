import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { getInitialValuesFromSchema } from "@/components/Form/helpers";
import { useLottie } from "@/components/LottieAnimations";
import { MUTATIONS } from "@/graphql/mutations";
import { QUERIES } from "@/graphql/queries";
import { APP_PATHS } from "@/routes/appPaths";
import { logger } from "@/utils/logger";
import { normalizeCurrencyStrToInt } from "@/utils/normalizers/currency";
import { InvoiceForm } from "./InvoiceForm";
import { invoiceFormSchema, type InvoiceFormValues } from "./schema";
import type { WorkOrder } from "@/graphql/types";

/**
 * - Prop `workOrderToInvoice` represents a WO to attach to the Invoice. Note
 *   that once a WO is attached to an Invoice, the WO can NOT be unattached,
 *   nor can the Invoice be re-assigned to some other recipient - the Invoice
 *   can only be cancelled/deleted.
 */
export const FormCreateInvoice = ({
  workOrderToInvoice = null,
}: {
  workOrderToInvoice?: WorkOrder | null;
}) => {
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const nav = useNavigate();

  const [createInvoice] = useMutation(MUTATIONS.CREATE_INVOICE, {
    update(cache, { data }) {
      if (data?.createInvoice) {
        cache.updateQuery({ query: QUERIES.MY_INVOICES }, (cacheData) => ({
          myInvoices: {
            assignedToUser: cacheData?.myInvoices.assignedToUser ?? [],
            createdByUser: [...(cacheData?.myInvoices.createdByUser ?? []), data.createInvoice],
          },
        }));
      }
    },
  });

  const handleSubmit = async ({ assignedTo, amount, ...formValues }: InvoiceFormValues) => {
    await createInvoice({
      variables: {
        invoice: {
          assignedTo: assignedTo.id,
          amount: normalizeCurrencyStrToInt(amount),
          ...formValues,
        },
      },
    }).catch((err) => logger.error(err));

    await playLottie();

    nav(APP_PATHS.INVOICES_LIST_VIEW);
  };

  const formCreateInvoiceInitialValues = getInitialValuesFromSchema(invoiceFormSchema, {
    assignedTo: { id: workOrderToInvoice?.createdBy?.id ?? "" },
    workOrder: workOrderToInvoice?.id ?? null,
    amount: "",
  });

  return (
    <>
      <InvoiceForm onSubmit={handleSubmit} initialFormValues={formCreateInvoiceInitialValues} />
      {LottieView}
    </>
  );
};
