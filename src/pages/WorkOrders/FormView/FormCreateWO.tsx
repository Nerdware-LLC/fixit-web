import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react/hooks";
import { useLottie } from "@components/LottieAnimations";
import { MUTATIONS } from "@graphql/mutations";
import { QUERIES } from "@graphql/queries";
import { logger } from "@utils/logger";
import { WorkOrderForm } from "./Form";
import { woFormFieldHandlers, type WorkOrderFormValues } from "./formFieldHandlers";

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

  const handleSubmit = async (formValues: WorkOrderFormValues) => {
    const workOrder = woFormFieldHandlers.getFormFieldsForMutation(formValues);

    // Ensure any ChecklistItems only have property "description" onCreate
    if (Array.isArray(workOrder.checklist)) {
      workOrder.checklist = workOrder.checklist.map(({ description }) => ({
        description,
      })) as WorkOrderFormValues["checklist"];
    }

    // If no keys, then no need to run the mutation
    if (Object.keys(workOrder).length >= 1) {
      await createWorkOrder({
        variables: {
          workOrder,
        },
      }).catch((err) => logger.error(err));
    }

    await playLottie();

    nav("/home/workorders");
  };

  return (
    <>
      <WorkOrderForm
        onSubmit={handleSubmit}
        initialFormValues={{
          assignedTo: null,
          location: {
            country: "USA",
            region: "",
            city: "",
            streetLine1: "",
            streetLine2: null,
          },
          category: null,
          description: null,
          checklist: null,
          priority: "NORMAL",
          entryContact: null,
          entryContactPhone: null,
          dueDate: null,
          scheduledDateTime: null,
        }}
      />
      {LottieView}
    </>
  );
};
