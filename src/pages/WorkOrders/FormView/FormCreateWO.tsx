import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { useSuccessLottie } from "@components";
import { MUTATIONS, FRAGMENTS } from "@graphql";
import { logger } from "@utils";
import { WorkOrderForm, type WorkOrderFormValues } from "./Form";
import { woFormFieldHandlers } from "./formFieldHandlers";

export const FormCreateWO = () => {
  const { LottieView, playLottie } = useSuccessLottie();
  const nav = useNavigate();

  const [createWorkOrder] = useMutation(MUTATIONS.CREATE_WORK_ORDER, {
    update(cache, { data: { createWorkOrder } }) {
      cache.modify({
        fields: {
          workOrders(existingWOs = []) {
            const newWorkOrderRef = cache.writeFragment({
              data: createWorkOrder,
              fragment: FRAGMENTS.WorkOrderFields
            });
            return [...existingWOs, newWorkOrderRef];
          }
        }
      });
    }
  });

  const handleSubmit = async (formValues: WorkOrderFormValues) => {
    const workOrder = woFormFieldHandlers.getFormFieldsForMutation(formValues);

    // Ensure any ChecklistItems only have property "description" onCreate
    if (Array.isArray(workOrder.checklist)) {
      workOrder.checklist = workOrder.checklist.map(({ description }) => ({ description }));
    }

    // If no keys, then no need to run the mutation
    if (Object.keys(workOrder).length >= 1) {
      await createWorkOrder({
        variables: {
          workOrder
        }
      }).catch((err) => logger.error(err));
    }

    await playLottie();

    nav("/home/workorders");
  };

  return (
    <>
      <WorkOrderForm
        onSubmit={handleSubmit}
        currentWorkOrderStatus="UNASSIGNED"
        initialFormValues={{
          assignedTo: null,
          location: {
            country: "USA",
            region: "",
            city: "",
            streetLine1: "",
            streetLine2: null
          },
          category: null,
          description: null,
          checklist: null,
          priority: "NORMAL",
          entryContact: null,
          entryContactPhone: null,
          dueDate: null,
          scheduledDateTime: null
        }}
      />
      {LottieView}
    </>
  );
};
