import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { MUTATIONS } from "@graphql/mutations";
import { useLottie } from "@components";
import { logger } from "@utils";
import { WorkOrderForm } from "./Form";
import { woFormFieldHandlers, type WorkOrderFormValues } from "./formFieldHandlers";
import type { WorkOrder } from "@types";

export const FormUpdateWO = ({ workOrder: existingWorkOrder }: { workOrder: WorkOrder }) => {
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
          workOrder: woChangedFields
        }
      }).catch((err) => logger.error(err));
    }

    await playLottie();

    nav(`/home/workorders/${existingWorkOrder.id}`);
  };

  return (
    <>
      <WorkOrderForm
        onSubmit={handleSubmit}
        currentWorkOrderStatus={existingWorkOrder.status}
        initialFormValues={initialValues as WorkOrderFormValues}
      />
      {LottieView}
    </>
  );
};
