import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

export const LineChart = ({
  data,
  height = "100%",
  width = "100%",
  options = {},
  containerStyle = {}, // TODO replace containerStyle prop with sx/styled
  ...props
}: {
  data: ChartData<"line">;
  height?: string;
  width?: string;
  options?: ChartOptions<"line">;
  containerStyle?: React.ComponentPropsWithoutRef<"div">["style"];
} & Omit<React.ComponentProps<typeof Line>, "data" | "options" | "height" | "width">) => {
  return (
    <div
      className="line-chart-container"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "space-around",
        justifyContent: "space-around",
        ...containerStyle
      }}
    >
      <Line data={data} height={height} width={width} options={options} {...props} />
    </div>
  );
};
