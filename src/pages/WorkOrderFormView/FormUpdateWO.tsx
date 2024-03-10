import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { getInitialValuesFromSchema } from "@/components/Form/helpers";
import { useLottie } from "@/components/LottieAnimations";
import { MUTATIONS } from "@/graphql/mutations";
import { getItemViewPath } from "@/routes/helpers";
import { logger } from "@/utils/logger";
import { WorkOrderForm } from "./WorkOrderForm";
import { workOrderFormSchema, type WorkOrderFormValues } from "./schema";
import type { WorkOrder } from "@/graphql/types";

export const FormUpdateWO = ({ existingWorkOrder }: { existingWorkOrder: WorkOrder }) => {
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const nav = useNavigate();
  const [updateWorkOrder] = useMutation(MUTATIONS.UPDATE_WORK_ORDER);

  const handleSubmit = async (formValues: WorkOrderFormValues) => {
    await updateWorkOrder({
      variables: {
        workOrderID: existingWorkOrder.id,
        workOrder: formValues,
      },
    }).catch((err) => logger.error(err));

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
