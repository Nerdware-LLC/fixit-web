import { Suspense, lazy } from "react";
import { isString } from "@nerdware/ts-type-safety-utils";
import deepMerge from "lodash.merge";
import { useTheme, alpha } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import { usePageLayoutContext } from "@/app/PageLayoutContext";
import { Loading } from "@/components/Indicators/Loading.jsx";
import type { ChartData, ChartOptions, DefaultDataPoint } from "chart.js";
import type { ChartProps } from "react-chartjs-2/dist/types";
import type { Simplify } from "type-fest";

const Line = lazy(
  () => import(/* webpackChunkName: "ChartJS-LineChart" */ "./chartJS.registerLineChart")
);

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
 * > If `options.scales` is provided, only `x` and `y` axes are valid.
 *   Custom values for `xAxisID` and `yAxisID` are not supported.
 *
 * @docs
 * - [react-chartjs-2 Line Chart](https://react-chartjs-2.netlify.app/components/line)
 * - [ChartJS Line Chart](https://www.chartjs.org/docs/latest/charts/line.html)
 * - [ChartJS a11y](https://www.chartjs.org/docs/latest/general/accessibility.html)
 */
export const LineChart = <
  TData extends DefaultDataPoint<"line"> = DefaultDataPoint<"line">,
  TLabel = unknown,
>({
  title,
  data,
  options = {},
  height = "100%",
  width = "100%",
  // ARIA attributes:
  role = "img",
  "aria-label": ariaLabel,
  // Box container props:
  sx,
  ref,
  ...lineChartProps
}: LineChartProps<TData, TLabel>) => {
  const { isMobilePageLayout } = usePageLayoutContext();
  const { palette } = useTheme();

  const defaultTitleAndLegendFontColor = alpha(palette.text.primary, 0.75);

  // Default styles for both X and Y axes elements with theme/palette colors:
  const xyAxesDefaultStyles = {
    ticks: {
      padding: 10,
      color: alpha(palette.text.primary, 0.7),
      maxRotation: 0,
    },
    ...(palette.mode === "dark" && {
      grid: { color: alpha(palette.text.primary, 0.07) },
      border: { color: alpha(palette.text.primary, 0.09) },
    }),
  };

  // If `title` was not provided,  but `options.plugins.title.text` was, set `title` to that value:
  if (!title) {
    const maybeTitlePluginText = options.plugins?.title?.text;
    if (isString(maybeTitlePluginText)) title = maybeTitlePluginText;
  }

  // Merge user-provided options with default options:
  const mergedOptions = deepMerge(
    // Default options:
    {
      scales: {
        x: { axis: "x", ...xyAxesDefaultStyles },
        y: { axis: "y", ...xyAxesDefaultStyles },
      },
      plugins: {
        title: {
          text: title,
          display: !!title,
          color: defaultTitleAndLegendFontColor,
        },
        subtitle: {
          display: true,
          text: `${isMobilePageLayout ? "Tap" : "Click"} labels to show/hide data`,
          // the above text can be hidden by setting `plugins.subtitle.display` to `false`
        },
        legend: {
          labels: {
            color: defaultTitleAndLegendFontColor,
          },
        },
      },
    },
    // User-provided options:
    options
  );

  return (
    <Box
      sx={sx}
      ref={ref}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "space-around",
        justifyContent: "space-around",
      }}
    >
      <Suspense fallback={<Loading />}>
        <Line
          data={data}
          title={title}
          height={height}
          width={width}
          role={role}
          options={mergedOptions}
          aria-label={ariaLabel || title || "Fixit Line Chart"}
          {...lineChartProps}
        />
      </Suspense>
    </Box>
  );
};

export type LineChartProps<
  TData extends DefaultDataPoint<"line"> = DefaultDataPoint<"line">,
  TLabel = unknown,
> = {
  data: ChartData<"line", TData, TLabel>;
  title?: string;
  height?: string;
  width?: string;
  options?: Simplify<
    Omit<ChartOptions<"line">, "scales"> & {
      scales?: Partial<Record<"x" | "y", LineChartAxisOptions>>;
    }
  >;
} & Pick<BoxProps, "sx" | "ref"> &
  Omit<ChartProps<"line", TData, TLabel>, "type" | "data" | "options" | "height" | "width">;

/**
 * A type representing the {@link LineChart} component's `options.scales["x" | "y"]` objects
 * used to configure the `x` and `y` axes.
 */
export type LineChartAxisOptions = Exclude<ChartOptions<"line">["scales"], undefined>[string];
