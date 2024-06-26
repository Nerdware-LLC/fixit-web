import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { getInitialValuesFromSchema } from "@/components/Form/helpers";
import { useLottie } from "@/components/LottieAnimations";
import { MUTATIONS } from "@/graphql/mutations.js";
import { QUERIES } from "@/graphql/queries.js";
import { APP_PATHS } from "@/routes/appPaths.js";
import { logger } from "@/utils/logger.js";
import { WorkOrderForm } from "./WorkOrderForm.jsx";
import { workOrderFormSchema, type WorkOrderFormValues } from "./schema.js";

export const FormCreateWO = () => {
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const nav = useNavigate();

  const [createWorkOrder] = useMutation(MUTATIONS.CREATE_WORK_ORDER, {
    update(cache, { data }) {
      if (data?.createWorkOrder) {
        cache.updateQuery({ query: QUERIES.MY_WORK_ORDERS }, (cacheData) => ({
          myWorkOrders: {
            assignedToUser: cacheData?.myWorkOrders.assignedToUser ?? [],
            createdByUser: [...(cacheData?.myWorkOrders.createdByUser ?? []), data.createWorkOrder],
          },
        }));
      }
    },
  });

  const handleSubmit = async ({ assignedTo, ...formValues }: WorkOrderFormValues) => {
    await createWorkOrder({
      variables: {
        workOrder: {
          assignedTo: assignedTo?.id ?? null,
          ...formValues,
        },
      },
    }).catch(logger.error);

    await playLottie();

    nav(APP_PATHS.WORK_ORDERS_LIST_VIEW);
  };

  return (
    <>
      <WorkOrderForm onSubmit={handleSubmit} initialFormValues={formCreateWOinitialValues} />
      {LottieView}
    </>
  );
};

const formCreateWOinitialValues = getInitialValuesFromSchema(workOrderFormSchema);
