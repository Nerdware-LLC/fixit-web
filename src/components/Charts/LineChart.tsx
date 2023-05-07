import { Suspense, lazy } from "react";
import Box, { type BoxProps } from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import type { ChartData, ChartOptions } from "chart.js";

// prettier-ignore
const Line = lazy(() => import(/* webpackChunkName: "ChartJS-LineChart" */ "./chartJS.registerLineChart"));

export const LineChart = ({
  data,
  height = "100%",
  width = "100%",
  options = {},
  sx,
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
      <Line data={data} height={height} width={width} options={options} {...props} />
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
