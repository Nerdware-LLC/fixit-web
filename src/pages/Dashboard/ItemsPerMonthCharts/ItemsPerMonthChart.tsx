import dayjs from "dayjs";
import { useTheme, alpha } from "@mui/material/styles";
import { LineChart } from "@components/Charts/LineChart";
import {
  ItemsPerMonthDataParser,
  type ItemsPerMonthDataParserAccum,
} from "../DashboardDataContext";

export const ItemsPerMonthChart = ({
  title,
  numCreatedByUserByLast12Months,
  numAssignedToUserByLast12Months,
  yAxisMaximum,
}: ItemsPerMonthChartProps) => {
  const { palette, variables } = useTheme();

  const titleAndLegendFontColor = alpha(palette.text.primary, 0.75);

  // Used in both X and Y axes
  const sharedAxesOptions = {
    ticks: {
      padding: 10,
      color: alpha(palette.text.primary, 0.7),

      maxRotation: 0, // don't allow labels to rotate, looks bad
    },
    ...(palette.mode === "dark" && {
      grid: { color: alpha(palette.text.primary, 0.07) },
      border: { color: alpha(palette.text.primary, 0.09) },
    }),
  };

  return (
    <LineChart
      data={{
        labels: ItemsPerMonthDataParser.monthStartTimestamps,
        datasets: [
          {
            label: "Sent",
            data: Object.entries(numCreatedByUserByLast12Months).map(
              ([monthStartTimestampKey, monthCountValue]) => ({
                x: Number(monthStartTimestampKey),
                y: monthCountValue,
              })
            ),
            borderColor: alpha(palette.success.light, 0.65), // line color
            backgroundColor: palette.success.light,
            pointBorderColor: palette.success.dark,
          },
          {
            label: "Received",
            data: Object.entries(numAssignedToUserByLast12Months).map(
              ([monthStartTimestampKey, monthCountValue]) => ({
                x: Number(monthStartTimestampKey),
                y: monthCountValue,
              })
            ),
            borderColor: alpha(palette.info.light, 0.65),
            backgroundColor: alpha(palette.info.light, 0.7),
            pointBorderColor: palette.info.dark,
          },
        ],
      }}
      options={{
        parsing: false,
        layout: {
          padding: {
            bottom: -10,
          },
        },
        scales: {
          x: {
            axis: "x",
            type: "timeseries",
            afterTickToLabelConversion(axis) {
              /* TICK LABEL RULES:
                - Tick labels are formatted as month shortnames, e.g. "Jan", "Feb", "Mar".
                - For "Jan", the year is shown on a newline below "Jan".
                - If x-axis scale width is less than 375px:
                  - Every other tick-label is "hidden" to prevent crowding/overlap.
                  - The LAST tick-label (index 11) is always shown, so it's the even-indexed
                    tick-labels that are "hidden" by setting `label` to an empty string.
                  - The year is shown below all month labels (otherwise the year, below "Jan"
                    wouldn't be shown half the time).  */

              axis.ticks = axis.ticks.map(
                axis.width >= 375
                  ? ({ value }) => ({
                      major: true,
                      value,
                      label: formatTickLabel.getMonthAndMaybeYear(value),
                    })
                  : ({ value }, index) => ({
                      major: true,
                      value,
                      label: index % 2 === 1 ? formatTickLabel.getMonthYearTuple(value) : "",
                    })
              );
            },

            time: {
              unit: "month",
              minUnit: "month",
              round: "month",
              displayFormats: { month: "MMM" },
              tooltipFormat: "MMMM YYYY",
            },
            ...sharedAxesOptions,
            ticks: {
              ...sharedAxesOptions.ticks,
              autoSkip: false,
              source: "labels", // <-- required to disable autoSkip
            },
          },
          y: {
            axis: "y",
            type: "linear",
            beginAtZero: true,
            min: 0,
            max: Math.max(
              yAxisMaximum + 1, // + 1 adds a little extra space at the top
              5 // don't show fewer than 5 on the Y axis
            ),
            ...sharedAxesOptions,
            ticks: {
              ...sharedAxesOptions.ticks,
              stepSize: yAxisMaximum > 100 ? 10 : 1,
            },
          },
        },
        plugins: {
          title: {
            text: title,
            color: titleAndLegendFontColor,
          },
          subtitle: {
            display: true,
            text: `${variables.isMobilePageLayout ? "Tap" : "Click"} labels to show/hide data`,
          },
          legend: {
            labels: {
              color: titleAndLegendFontColor,
            },
          },
        },
      }}
    />
  );
};

const formatTickLabel = {
  /**
   * Returns the 3-letter month shortname; for January, a tuple is returned in the
   * format of `[month, year]`, which causes the year to be placed on a new line.
   */
  getMonthAndMaybeYear(unixTimeInMilliseconds: number) {
    const [month, year] = dayjs(unixTimeInMilliseconds).format("MMM YYYY").split(" ");
    return /^Jan/i.test(month) ? [month, year] : month;
  },

  /**
   * Returns a tuple in the format of `[month, year]`.
   */
  getMonthYearTuple(unixTimeInMilliseconds: number) {
    return dayjs(unixTimeInMilliseconds).format("MMM 'YY").split(" ");
  },
};

export type ItemsPerMonthChartProps = {
  title: string;
  numCreatedByUserByLast12Months: ItemsPerMonthDataParserAccum["MONTH_COUNTS"];
  numAssignedToUserByLast12Months: ItemsPerMonthDataParserAccum["MONTH_COUNTS"];
  yAxisMaximum: number;
};
