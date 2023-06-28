import { useQuery } from "@apollo/client/react/hooks";
import { useField } from "formik";
import { itemDetailsClassNames } from "@components/DataDisplay";
import { QUERIES } from "@graphql/queries";
import { InvoiceWorkOrderInfo, type InvoiceWorkOrderInfoProps } from "../InvoiceWorkOrderInfo";
import type { Except } from "type-fest";

export const FormInvoiceWorkOrderInfo = (
  containerProps: Except<InvoiceWorkOrderInfoProps, "workOrder">
) => {
  const [{ value: selectedWorkOrderID }] = useField("workOrder");
  const { data } = useQuery(QUERIES.WORK_ORDER, {
    variables: { workOrderID: selectedWorkOrderID },
    fetchPolicy: "cache-only",
  });

  return (
    <>
      {selectedWorkOrderID && data?.workOrder ? (
        <InvoiceWorkOrderInfo
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
            [`& .${itemDetailsClassNames.header}`]: {
              ...(theme.variables.isMobilePageLayout && {
                display: "none",
              }),
            },
          })}
          {...containerProps}
        />
      ) : null}
    </>
  );
};
