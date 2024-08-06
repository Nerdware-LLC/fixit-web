import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { getInitialValuesFromSchema } from "@/components/Form/helpers";
import { useLottie } from "@/components/LottieAnimations";
import { MUTATIONS } from "@/graphql/mutations.js";
import { getItemViewPath } from "@/routes/helpers.js";
import { currencyStrToInt, intToCurrencyStr } from "@/utils/formatters/currency.js";
import { InvoiceForm } from "./InvoiceForm.jsx";
import { invoiceFormSchema, type InvoiceFormValues } from "./schema.js";
import type { Invoice } from "@/types/graphql.js";

export const FormUpdateInvoice = ({ invoice: existingInvoice }: { invoice: Invoice }) => {
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const nav = useNavigate();
  const [updateInvoice] = useMutation(MUTATIONS.UPDATE_INVOICE_AMOUNT);

  const handleSubmit = async ({ amount }: InvoiceFormValues) => {
    await updateInvoice({
      variables: {
        invoiceID: existingInvoice.id,
        amount: currencyStrToInt(amount),
      },
    });

    await playLottie();

    nav(getItemViewPath("invoices", existingInvoice.id));
  };

  const formUpdateInvoiceInitialValues = getInitialValuesFromSchema(invoiceFormSchema, {
    assignedTo: { id: existingInvoice.assignedTo.id },
    workOrder: existingInvoice.workOrder?.id ?? null,
    amount: intToCurrencyStr(existingInvoice.amount),
  });

  return (
    <>
      <InvoiceForm
        initialFormValues={formUpdateInvoiceInitialValues}
        onSubmit={handleSubmit}
        existingInvoice={existingInvoice}
      />
      {LottieView}
    </>
  );
};
