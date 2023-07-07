import { formatCurrencyStrToInt } from "@utils/currency";
import { FormFieldHandlers, type FormValues } from "@utils/formUtils";
import { formatNum } from "@utils/formatNum";
import type { Invoice } from "@graphql/types";

export const invoiceFormFieldHandlers = new FormFieldHandlers<
  InvoiceFormValues,
  InvoiceFormValuesForMutation
>({
  onUpdate: {
    createdBy: false,
    assignedTo: false,
    amount: (rawFieldValue: number) => formatNum.toCurrencyStr(rawFieldValue).slice(1), // slice to rm "$" starting char
    status: false,
    stripePaymentIntentID: false,
    workOrder: false,
  },
  onSubmit: {
    amount: (formValue, existingValue) => {
      const formValueAsInteger = formatCurrencyStrToInt(formValue);

      return {
        wasChanged: formValueAsInteger !== existingValue,
        value: formValueAsInteger,
      };
    },
  },
});

export type InvoiceFormValues = FormValues<
  Invoice,
  "id" | "createdBy" | "status" | "stripePaymentIntentID" | "createdAt" | "updatedAt"
>;

export type InvoiceFormValuesForMutation = Omit<InvoiceFormValues, "amount"> & {
  amount: number;
};
