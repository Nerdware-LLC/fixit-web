import { FormFieldHandlers, formatNum, formatCurrencyStrToInt } from "@utils";
import type { Invoice, FormValues } from "@types";

export const invoiceFormFieldHandlers = new FormFieldHandlers<InvoiceFormValues>({
  onUpdate: {
    createdBy: false,
    assignedTo: false,
    amount: (rawFieldValue: number) => formatNum.toCurrencyStr(rawFieldValue).slice(1), // slice to rm "$" starting char
    status: false,
    stripePaymentIntentID: false,
    workOrder: false
  },
  onSubmit: {
    amount: (formValue, existingValue) => {
      const formValueAsInteger = formatCurrencyStrToInt(formValue);

      return {
        wasChanged: formValueAsInteger !== existingValue,
        value: formValueAsInteger
      };
    }
  }
});

export type InvoiceFormValues = FormValues<
  Invoice,
  "id" | "createdBy" | "status" | "stripePaymentIntentID" | "createdAt" | "updatedAt"
>;
