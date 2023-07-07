import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { useLottie } from "@components/LottieAnimations";
import { MUTATIONS } from "@graphql/mutations";
import { logger } from "@utils/logger";
import { WorkOrderForm } from "./Form";
import { woFormFieldHandlers, type WorkOrderFormValues } from "./formFieldHandlers";
import type { WorkOrder } from "@graphql/types";

export const FormUpdateWO = ({ existingWorkOrder }: { existingWorkOrder: WorkOrder }) => {
  const { LottieView, playLottie } = useLottie({ animation: "success-checkmark" });
  const nav = useNavigate();
  const [updateWorkOrder] = useMutation(MUTATIONS.UPDATE_WORK_ORDER);

  const initialValues = woFormFieldHandlers.getInitValuesForUpdate(existingWorkOrder);

  const handleSubmit = async (formValues: WorkOrderFormValues) => {
    const woChangedFields = woFormFieldHandlers.getFormFieldsForMutation(formValues, initialValues);

    // If no keys, then no need to run the mutation
    if (Object.keys(woChangedFields).length >= 1) {
      await updateWorkOrder({
        variables: {
          workOrderID: existingWorkOrder.id,
          workOrder: woChangedFields,
        },
      }).catch((err) => logger.error(err));
    }

    await playLottie();

    nav(`/home/workorders/${existingWorkOrder.id}`);
  };

  return (
    <>
      <WorkOrderForm
        initialFormValues={initialValues as WorkOrderFormValues}
        onSubmit={handleSubmit}
        existingWorkOrder={existingWorkOrder}
      />
      {LottieView}
    </>
  );
};
