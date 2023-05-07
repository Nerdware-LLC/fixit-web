import { object as yupObject, string } from "yup";

export const schema = yupObject({
  assignedTo: string().required("Please select a recipient"),
  workOrder: string().nullable(),
  amount: string()
    .matches(/^[1-9]+(\.\d{0,2})?$/, "Please enter a valid invoice amount")
    .required("Required"),
});
