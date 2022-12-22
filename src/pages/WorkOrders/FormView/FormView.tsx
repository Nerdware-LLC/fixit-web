import { useLocation } from "react-router-dom";
import { FormCreateWO } from "./FormCreateWO";
import { FormUpdateWO } from "./FormUpdateWO";

export const WorkOrderFormView = () => {
  const { state: locationState } = useLocation();

  const title = locationState?.workOrder ? "Update Work Order" : "Create Work Order";

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <h2>{title}</h2>
      {locationState?.workOrder ? (
        <FormUpdateWO workOrder={locationState.workOrder} />
      ) : (
        <FormCreateWO />
      )}
    </div>
  );
};
