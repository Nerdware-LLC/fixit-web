import { WO_STATUS_ICONS_JSX } from "@/components/Icons/WorkOrderStatusIcon.jsx";
import { StatusCountWidget } from "@/components/Widgets/StatusCountWidget.jsx";
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
