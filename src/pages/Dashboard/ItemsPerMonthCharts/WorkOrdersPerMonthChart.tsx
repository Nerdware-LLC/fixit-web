import { ItemsPerMonthChart } from "./ItemsPerMonthChart";
import { useDashboardDataContext } from "../DashboardDataContext";

export const WorkOrdersPerMonthChart = () => {
  const { widgetData, widgetConfigs } = useDashboardDataContext();

  const { createdByUser, assignedToUser } = widgetData.WorkOrdersPerMonthChart;

  return (
    <ItemsPerMonthChart
      title="Work Orders per Month"
      numCreatedByUserByLast12Months={createdByUser}
      numAssignedToUserByLast12Months={assignedToUser}
      {...widgetConfigs.ItemsPerMonthCharts}
    />
  );
};
