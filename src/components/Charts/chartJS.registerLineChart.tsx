import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  // CONTROLLER
  LineController,
  // SCALES
  LinearScale,
  TimeSeriesScale,
  // ELEMENTS
  LineElement,
  PointElement,
  // PLUGINS
  Title,
  SubTitle,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
// Required for time/timeseries scales:
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";

ChartJS.register(
  // CONTROLLER
  LineController,
  // SCALES
  LinearScale,
  TimeSeriesScale,
  // ELEMENTS
  LineElement,
  PointElement,
  // PLUGINS
  Title,
  SubTitle,
  Tooltip,
  Filler,
  Legend
);

////////////////////////////////////////////////////////////////
// ChartJS Global Default Overrides:

// elements
ChartJS.defaults.elements.line.borderJoinStyle = "round";
ChartJS.defaults.elements.line.tension = 0.05;
// font
ChartJS.defaults.font.family = '"Roboto", sans-serif';
ChartJS.defaults.font.size = 14;
// maintainAspectRatio
ChartJS.defaults.maintainAspectRatio = false;
// plugins
ChartJS.defaults.plugins.title.font = {
  family: '"Roboto", sans-serif',
  size: 15,
  lineHeight: 1,
  weight: "bold",
};

////////////////////////////////////////////////////////////////
// Default Export for lazy loading:

export default Line;
