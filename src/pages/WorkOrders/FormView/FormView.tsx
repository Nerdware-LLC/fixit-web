import { useLocation } from "react-router-dom";
import { CoreItemView } from "@layouts/CoreItemView";
import { FormCreateWO } from "./FormCreateWO";
import { FormUpdateWO } from "./FormUpdateWO";

export const WorkOrderFormView = () => {
  const { state: locationState } = useLocation();

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
