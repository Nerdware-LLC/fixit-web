import { ItemsPerMonthChart } from "./ItemsPerMonthChart";
import { useDashboardDataContext } from "../DashboardDataContext";

export const InvoicesPerMonthChart = () => {
  const { widgetData, widgetConfigs } = useDashboardDataContext();

  const { createdByUser, assignedToUser } = widgetData.InvoicesPerMonthChart;

  return (
    <ItemsPerMonthChart
      title="Invoices per Month"
      numCreatedByUserByLast12Months={createdByUser}
      numAssignedToUserByLast12Months={assignedToUser}
      {...widgetConfigs.ItemsPerMonthCharts}
    />
  );
};
