import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { getInitialValuesFromSchema } from "@/components/Form/helpers";
import { useLottie } from "@/components/LottieAnimations";
import { MUTATIONS } from "@/graphql/mutations.js";
import { getItemViewPath } from "@/routes/helpers.js";
import { logger } from "@/utils/logger.js";
import { WorkOrderForm } from "./WorkOrderForm.jsx";
import { workOrderFormSchema, type WorkOrderFormValues } from "./schema.js";
import type { WorkOrder } from "@/types/graphql.js";

export const FormUpdateWO = ({ existingWorkOrder }: { existingWorkOrder: WorkOrder }) => {
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const nav = useNavigate();
  const [updateWorkOrder] = useMutation(MUTATIONS.UPDATE_WORK_ORDER);

  const handleSubmit = async (formValues: WorkOrderFormValues) => {
    await updateWorkOrder({
      variables: {
        workOrderID: existingWorkOrder.id,
        workOrder: {
          ...formValues,
          dueDate: formValues.dueDate?.toDate(),
          scheduledDateTime: formValues.scheduledDateTime?.toDate(),
        },
      },
    }).catch(logger.error);

    await playLottie();

    nav(getItemViewPath("workorders", existingWorkOrder.id));
  };

  const formUpdateWOinitialValues = getInitialValuesFromSchema(
    workOrderFormSchema,
    existingWorkOrder
  );

  return (
    <>
      <WorkOrderForm
        initialFormValues={formUpdateWOinitialValues}
        onSubmit={handleSubmit}
        existingWorkOrder={existingWorkOrder}
      />
      {LottieView}
    </>
  );
};
