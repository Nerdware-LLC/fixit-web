import dayjs from "dayjs";
import { LineChart, type LineChartProps } from "./LineChart.jsx";
import type { ChartDataset } from "chart.js";
import type { Simplify } from "type-fest";

/**
 * A react-chartjs-2 {@link LineChart} which shows a number of items per month over time.
 *
 * @param title - The chart title.
 * @param monthStartTimestamps - An array of numerical millisecond timestamps, each of which
 * should reflect the first millisecond of a given month. These timestamps are converted to
 * month shortnames (e.g., "Jan" for January) which are used as the X-axis labels.
 * @param datasets - An array of ChartJS LineChart dataset objects, each of which must include
 * a `data` object whose keys are the {@link ItemsPerMonthChartProps.monthStartTimestamps|monthStartTimestamps}.
 * @param yAxisMaximum - The maximum value for the Y-axis. This value is used to determine the
 * Y-axis scale.
 *
 * @template MonthStartTimestamps - A **_readonly_** array of numerical millisecond timestamps,
 * each of which should reflect the first millisecond of a given month. For better intellisense,
 * define the array using `[...] as const`.
 */
export const ItemsPerMonthChart = <MonthStartTimestamps extends ReadonlyArray<number>>({
  title,
  monthStartTimestamps,
  datasets,
  yAxisMaximum,
  ...lineChartProps
}: ItemsPerMonthChartProps<MonthStartTimestamps>) => (
  <LineChart
    title={title}
    data={{
      labels: [...monthStartTimestamps],
      datasets: datasets.map((dataset) => ({
        ...dataset,
        data: Object.entries<number>(dataset.data).map(
          ([monthStartTimestampKey, monthCountValue]) => ({
            x: Number(monthStartTimestampKey),
            y: monthCountValue,
          })
        ),
      })),
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
            /*
              TICK LABEL RULES:
              - Tick labels are formatted as month shortnames, e.g. "Jan", "Feb", "Mar".
              - For "Jan", the year is shown on a newline below "Jan".
              - If x-axis scale width is less than 375px:
                - Every other tick-label is "hidden" to prevent crowding/overlap.
                - The LAST tick-label (index 11) is always shown, so it's the even-indexed
                  tick-labels that are "hidden" by setting `label` to an empty string.
                - The year is shown below all month labels (otherwise the year, below "Jan"
                  wouldn't be shown half the time).
            */
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
          ticks: {
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
          ticks: {
            stepSize: yAxisMaximum > 100 ? 10 : 1,
          },
        },
      },
    }}
    {...lineChartProps}
  />
);

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

/**
 * Props for the {@link ItemsPerMonthChart} component.
 *
 * @template MonthStartTimestamps - A **_readonly_** array of numerical millisecond timestamps,
 * each of which should reflect the first millisecond of a given month. For better intellisense,
 * define the array using `[...] as const`.
 */
export type ItemsPerMonthChartProps<MonthStartTimestamps extends ReadonlyArray<number>> = {
  /**
   * The chart title.
   */
  title: string;
  /**
   * An array of numerical millisecond timestamps, each of which should reflect the first
   * millisecond of a given month. These timestamps are converted to month shortnames (e.g.,
   * "Jan" for January) which are used as the X-axis labels.
   *
   * > Each dataset object in the {@link ItemsPerMonthChartProps.datasets|datasets} array must
   *   include these timestamps as the keys of its `data` object.
   */
  monthStartTimestamps: MonthStartTimestamps;
  /**
   * An array of ChartJS LineChart dataset objects, each of which must include a `data` object
   * whose keys are the {@link ItemsPerMonthChartProps.monthStartTimestamps|monthStartTimestamps}.
   */
  datasets: Array<ItemsPerMonthChartDataset<MonthStartTimestamps>>;
  /**
   * The maximum value for the Y-axis. This value is used to determine the Y-axis scale.
   */
  yAxisMaximum: number;
} & Omit<LineChartProps, "data" | "options">;

export type ItemsPerMonthChartDataset<MonthStartTimestamps extends ReadonlyArray<number>> =
  Simplify<
    Omit<ChartDataset<"line">, "data" | "label"> & {
      label: string;
      data: ItemsPerMonthCountObject<MonthStartTimestamps>;
    }
  >;

export type ItemsPerMonthCountObject<MonthStartTimestamps extends ReadonlyArray<number>> = Record<
  MonthStartTimestamps[number],
  number
>;
