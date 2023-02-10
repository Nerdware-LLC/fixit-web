import { useTheme, alpha } from "@mui/material/styles";
import { LineChart } from "@components";
import { monthLabels } from "../DashboardDataContext";

export const ItemsPerMonthChart = ({
  title,
  numCreatedByUserByLast12Months,
  numAssignedToUserByLast12Months,
  yAxisMaximum
}: {
  title: string;
  numCreatedByUserByLast12Months: Array<number>;
  numAssignedToUserByLast12Months: Array<number>;
  yAxisMaximum: number;
}) => {
  const { palette, variables } = useTheme();

  const titleAndLegendFontColor = alpha(palette.text.primary, 0.75);

  // Used in both X and Y axes
  const scalesSharedConfigs = {
    ticks: {
      padding: 10,
      color: alpha(palette.text.primary, 0.7)
    },
    ...(palette.mode === "dark" && {
      grid: { color: alpha(palette.text.primary, 0.07) },
      border: { color: alpha(palette.text.primary, 0.09) }
    })
  };

  return (
    <LineChart
      data={{
        labels: monthLabels,
        datasets: [
          {
            label: "Sent",
            data: numCreatedByUserByLast12Months,
            borderColor: alpha(palette.success.light, 0.65), // line color
            backgroundColor: palette.success.light,
            pointBorderColor: palette.success.dark
          },
          {
            label: "Received",
            data: numAssignedToUserByLast12Months,
            borderColor: alpha(palette.info.light, 0.65),
            backgroundColor: alpha(palette.info.light, 0.7),
            pointBorderColor: palette.info.dark
          }
        ]
      }}
      options={{
        scales: {
          x: {
            axis: "x",
            type: "category",
            ...scalesSharedConfigs
          },
          y: {
            axis: "y",
            type: "linear",
            suggestedMin: 0,
            max: yAxisMaximum + 1, // + 1 adds a little extra space at the top
            ...scalesSharedConfigs
          }
        },
        plugins: {
          title: {
            text: title,
            color: titleAndLegendFontColor
          },
          subtitle: {
            display: true,
            text: `${variables.isMobilePageLayout ? "Tap" : "Click"} labels to show/hide data`
          },
          legend: {
            labels: {
              color: titleAndLegendFontColor
            }
          }
        }
      }}
    />
  );
};
