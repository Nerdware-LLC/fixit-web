import { useLocation, type Location } from "react-router-dom";
import { CoreItemView } from "@/layouts/CoreItemView";
import { FormCreateWO } from "./FormCreateWO";
import { FormUpdateWO } from "./FormUpdateWO";
import type { WorkOrder } from "@/graphql/types";

export const WorkOrderFormView = () => {
  const { state: locationState } = useLocation() as Location<{ workOrder?: WorkOrder }>;

  return (
    <CoreItemView
      headerLabel={locationState?.workOrder ? "Update Work Order" : "Create Work Order"}
    >
      {locationState?.workOrder ? (
        <FormUpdateWO existingWorkOrder={locationState.workOrder} />
      ) : (
        <FormCreateWO />
      )}
    </CoreItemView>
  );
};

// Exported as "Component" for react-router-dom lazy loading
export const Component = WorkOrderFormView;
