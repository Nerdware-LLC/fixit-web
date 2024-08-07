import { useTheme, alpha } from "@mui/material/styles";
import { ItemsPerMonthChart } from "@/components/Charts/ItemsPerMonthChart.jsx";
import { TABLE_VIEW_DATA_SETS } from "@/layouts/CoreItemsListView/types.js";
import { useDashboardDataContext, ItemsPerMonthDataParser } from "./DashboardDataContext";

export const InvoicesPerMonthChart = () => {
  const { widgetData, widgetConfigs } = useDashboardDataContext();
  const { palette } = useTheme();

  const { createdByUser, assignedToUser } = widgetData.InvoicesPerMonthChart;

  return (
    <ItemsPerMonthChart
      title="Invoices per Month"
      monthStartTimestamps={ItemsPerMonthDataParser.monthStartTimestamps}
      datasets={[
        {
          label: TABLE_VIEW_DATA_SETS.SENT,
          data: createdByUser,
          borderColor: alpha(palette.success.light, 0.65), // line color
          backgroundColor: palette.success.light,
          pointBorderColor: palette.success.dark,
        },
        {
          label: TABLE_VIEW_DATA_SETS.RECEIVED,
          data: assignedToUser,
          borderColor: alpha(palette.info.light, 0.65),
          backgroundColor: alpha(palette.info.light, 0.7),
          pointBorderColor: palette.info.dark,
        },
      ]}
      {...widgetConfigs.ItemsPerMonthCharts}
    />
  );
};
