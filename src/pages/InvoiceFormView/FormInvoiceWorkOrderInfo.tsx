import { useQuery } from "@apollo/client/react/hooks";
import { useField } from "formik";
import {
  InvoiceWorkOrderDetails,
  dataDisplayClassNames,
  type ItemDetailsProps,
} from "@/components/DataDisplay";
import { QUERIES } from "@/graphql/queries.js";

export const FormInvoiceWorkOrderInfo = (itemDetailsContainerProps: ItemDetailsProps) => {
  const [{ value: selectedWorkOrderID }] = useField<string>("workOrder");
  const { data } = useQuery(QUERIES.WORK_ORDER, {
    variables: { workOrderID: selectedWorkOrderID },
    fetchPolicy: "cache-only",
  });

  return (
    <>
      {selectedWorkOrderID && data?.workOrder ? (
        <InvoiceWorkOrderDetails
          workOrder={data.workOrder}
          sx={(theme) => ({
            ...(theme.variables.isMobilePageLayout && {
              height: "1rem",
              margin: "0 0 0 auto",
              transform: "translateY(-1.75rem)",
              "& *": {
                fontSize: "0.95rem !important",
              },
            }),
            [`& .${dataDisplayClassNames.header}`]: {
              ...(theme.variables.isMobilePageLayout && {
                display: "none",
              }),
            },
          })}
          {...itemDetailsContainerProps}
        />
      ) : null}
    </>
  );
};
