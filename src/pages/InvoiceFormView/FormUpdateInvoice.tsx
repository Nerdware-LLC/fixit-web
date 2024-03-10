import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { getInitialValuesFromSchema } from "@/components/Form/helpers";
import { useLottie } from "@/components/LottieAnimations";
import { MUTATIONS } from "@/graphql/mutations";
import { getItemViewPath } from "@/routes/helpers";
import { fmt } from "@/utils/formatters";
import { normalizeCurrencyStrToInt } from "@/utils/normalizers/currency";
import { InvoiceForm } from "./InvoiceForm";
import { invoiceFormSchema, type InvoiceFormValues } from "./schema";
import type { Invoice } from "@/graphql/types";

export const FormUpdateInvoice = ({ invoice: existingInvoice }: { invoice: Invoice }) => {
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const nav = useNavigate();
  const [updateInvoice] = useMutation(MUTATIONS.UPDATE_INVOICE_AMOUNT);

  const handleSubmit = async ({ amount }: InvoiceFormValues) => {
    await updateInvoice({
      variables: {
        invoiceID: existingInvoice.id,
        amount: normalizeCurrencyStrToInt(amount),
      },
    });

    await playLottie();

    nav(getItemViewPath("invoices", existingInvoice.id));
  };

  const formUpdateInvoiceInitialValues = getInitialValuesFromSchema(invoiceFormSchema, {
    ...existingInvoice,
    amount: fmt.intToCurrencyStr(existingInvoice.amount),
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
