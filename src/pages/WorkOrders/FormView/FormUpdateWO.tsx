import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { MUTATIONS } from "@graphql/mutations";
import { logger } from "@utils";
import { WorkOrderForm, type WorkOrderFormValues } from "./Form";
import { woFormFieldHandlers } from "./formFieldHandlers";
import type { WorkOrder } from "@types";

export const FormUpdateWO = ({ workOrder: existingWorkOrder }: { workOrder: WorkOrder }) => {
  const [updateWorkOrder] = useMutation(MUTATIONS.UPDATE_WORK_ORDER);
  const nav = useNavigate();

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

    nav(-1); // go back to previous page
  };

  return (
    <WorkOrderForm
      onSubmit={handleSubmit}
      currentWorkOrderStatus={existingWorkOrder.status}
      initialFormValues={initialValues as WorkOrderFormValues}
    />
  );
};
