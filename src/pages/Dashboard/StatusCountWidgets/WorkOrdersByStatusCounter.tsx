import { WO_STATUS_ICON_REACT_NODES } from "@components/Icons/WorkOrderStatusIcon";
import { StatusCountWidget } from "./StatusCountWidget";
import { useDashboardDataContext } from "../DashboardDataContext";

export const WorkOrdersByStatusCounter = () => {
  const {
    widgetData: { WorkOrdersByStatusCounter },
  } = useDashboardDataContext();

  const { createdByUser, assignedToUser } = WorkOrdersByStatusCounter;

  return (
    <StatusCountWidget
      itemTypeLabel="Work Orders"
      statusIcons={WO_STATUS_ICON_REACT_NODES}
      numCreatedByUserByStatus={createdByUser}
      numAssignedToUserByStatus={assignedToUser}
    />
  );
};
