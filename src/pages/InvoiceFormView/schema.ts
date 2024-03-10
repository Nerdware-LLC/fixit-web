import { isValidCurrency } from "@nerdware/ts-string-helpers";
import { object as yupObject, type InferType } from "yup";
import { yupCommonSchema } from "@/components/Form/helpers";

export const invoiceFormSchema = yupObject({
  assignedTo: yupObject({
    id: yupCommonSchema.string.required(),
  }),
  workOrder: yupCommonSchema.stringNullable,
  amount: yupCommonSchema.string
    .test({
      name: "is-valid-invoice-amount",
      message: "Please enter a valid invoice amount",
      test: (value) => isValidCurrency(value),
    })
    .required("Required"),
});

export type InvoiceFormValues = InferType<typeof invoiceFormSchema>;
