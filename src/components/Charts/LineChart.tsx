import { Suspense, lazy } from "react";
import Box, { type BoxProps } from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import type { ChartData, ChartOptions } from "chart.js";

// prettier-ignore
const Line = lazy(() => import(/* webpackChunkName: "ChartJS-LineChart" */ "./chartJS.registerLineChart"));

/**
 * A react-chartjs-2 Line Chart which dynamically imports the bulky ChartJS bundle
 * with a fallback loading spinner. Per the ChartJS docs on a11y (link below), the
 * Line Chart is by default given the following attributes:
 *
 * - `role`, set to `"img"` by default (can be overriden, but not recommended)
 * - `aria-label`, the value of which is determined as follows:
 *   1. `props["aria-label"]` value if it's _truthy_
 *   2. `props.options.plugins.title.text` value if it's _truthy_
 *   3. `"Fixit Line Chart"` is used as a fallback if the other values are _falsey_
 *
 * @docs
 * - [react-chartjs-2 Line Chart](https://react-chartjs-2.netlify.app/components/line)
 * - [ChartJS Line Chart](https://www.chartjs.org/docs/latest/charts/line.html)
 * - [ChartJS a11y](https://www.chartjs.org/docs/latest/general/accessibility.html)
 */
export const LineChart = ({
  data,
  height = "100%",
  width = "100%",
  options = {},
  sx,
  // ARIA attributes:
  role = "img",
  "aria-label": ariaLabel = `${options?.plugins?.title?.text || ""}` || "Fixit Line Chart",
  ...props
}: LineChartProps) => (
  <Box
    className={lineChartClassNames.container}
    sx={sx}
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "space-around",
      justifyContent: "space-around",
    }}
  >
    <Suspense fallback={<CircularProgress />}>
      <Line
        data={data}
        height={height}
        width={width}
        options={options}
        role={role}
        aria-label={ariaLabel}
        {...props}
      />
    </Suspense>
  </Box>
);

export const lineChartClassNames = {
  container: "line-chart-container",
};

export type LineChartProps = {
  data: ChartData<"line">;
  height?: string;
  width?: string;
  options?: ChartOptions<"line">;
} & BoxProps &
  Omit<React.ComponentProps<typeof Line>, "data" | "options" | "height" | "width">;
