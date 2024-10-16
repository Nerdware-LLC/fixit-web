import { useQuery } from "@apollo/client/react/hooks";
import { useField } from "formik";
import {
  InvoiceWorkOrderDetails,
  type InvoiceWorkOrderDetailsProps,
} from "@/components/DataDisplay";
import { QUERIES } from "@/graphql/queries.js";

export type FormInvoiceWorkOrderInfoProps = Omit<InvoiceWorkOrderDetailsProps, "workOrder">;

export const FormInvoiceWorkOrderInfo = ({ ...props }: FormInvoiceWorkOrderInfoProps) => {
  const [{ value: selectedWorkOrderID }] = useField<string>("workOrder");

  const { data } = useQuery(QUERIES.WORK_ORDER, {
    variables: { workOrderID: selectedWorkOrderID },
    fetchPolicy: "cache-only",
  });

  return data?.workOrder ? <InvoiceWorkOrderDetails workOrder={data.workOrder} {...props} /> : null;
};
