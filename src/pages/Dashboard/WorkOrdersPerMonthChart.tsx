import { useTheme, alpha } from "@mui/material/styles";
import { ItemsPerMonthChart } from "@/components/Charts/ItemsPerMonthChart";
import { TABLE_VIEW_DATA_SETS } from "@/layouts/CoreItemsListView/types";
import { useDashboardDataContext, ItemsPerMonthDataParser } from "./DashboardDataContext";

export const WorkOrdersPerMonthChart = () => {
  const { widgetData, widgetConfigs } = useDashboardDataContext();
  const { palette } = useTheme();

  const { createdByUser, assignedToUser } = widgetData.WorkOrdersPerMonthChart;

  return (
    <ItemsPerMonthChart
      title="Work Orders per Month"
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
