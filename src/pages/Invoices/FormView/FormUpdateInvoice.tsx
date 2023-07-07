import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { useLottie } from "@components/LottieAnimations";
import { MUTATIONS } from "@graphql/mutations";
import { InvoiceForm } from "./Form";
import { invoiceFormFieldHandlers, type InvoiceFormValues } from "./formFieldHandlers";
import type { Invoice } from "@graphql/types";

export const FormUpdateInvoice = ({ invoice: existingInvoice }: { invoice: Invoice }) => {
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const nav = useNavigate();
  const [updateInvoice] = useMutation(MUTATIONS.UPDATE_INVOICE_AMOUNT);

  const initialValues = invoiceFormFieldHandlers.getInitValuesForUpdate(existingInvoice);

  const handleSubmit = async (formValues: InvoiceFormValues) => {
    const invoiceChangedFields = invoiceFormFieldHandlers.getFormFieldsForMutation(
      formValues,
      initialValues
    );

    // If no keys, then no need to run the mutation
    if (Object.keys(invoiceChangedFields).length >= 1) {
      await updateInvoice({
        variables: {
          invoiceID: existingInvoice.id,
          amount: invoiceChangedFields.amount,
        },
      });
    }

    await playLottie();

    nav(`/home/invoices/${existingInvoice.id}`);
  };

  return (
    <>
      <InvoiceForm
        initialFormValues={initialValues}
        onSubmit={handleSubmit}
        existingInvoice={existingInvoice}
      />
      {LottieView}
    </>
  );
};
