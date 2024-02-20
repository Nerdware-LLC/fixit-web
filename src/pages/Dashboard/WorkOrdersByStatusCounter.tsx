import { WO_STATUS_ICONS_JSX } from "@/components/Icons/WorkOrderStatusIcon";
import { StatusCountWidget } from "@/components/Widgets/StatusCountWidget";
import { useDashboardDataContext } from "./DashboardDataContext";

export const WorkOrdersByStatusCounter = () => {
  const {
    widgetData: { WorkOrdersByStatusCounter },
  } = useDashboardDataContext();

  const { createdByUser, assignedToUser } = WorkOrdersByStatusCounter;

  return (
    <StatusCountWidget
      itemTypeLabel="Work Orders"
      statusIcons={WO_STATUS_ICONS_JSX}
      numCreatedByUserByStatus={createdByUser}
      numAssignedToUserByStatus={assignedToUser}
    />
  );
};
