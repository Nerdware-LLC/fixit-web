import * as Yup from "yup";

export const schema = Yup.object({
  assignedTo: Yup.string().required("Please select a recipient"),
  workOrder: Yup.string().nullable(),
  // TODO How will "amount" be stored in Form state? String w decimal ...? Check how CurrencyInput does it.
  amount: Yup.string()
    .matches(/^\d+(\.\d{2})?$/, "Please enter a valid amount (for example: 100 or 100.00)")
    .required("Required")
});
