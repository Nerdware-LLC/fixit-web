import {
  Chart as ChartJS,
  // SCALES
  CategoryScale,
  LinearScale,
  // ELEMENTS
  PointElement,
  LineElement,
  // PLUGINS
  Title,
  SubTitle,
  Tooltip,
  Filler,
  Legend
} from "chart.js";

ChartJS.register(
  // SCALES
  CategoryScale,
  LinearScale,
  // ELEMENTS
  PointElement,
  LineElement,
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
ChartJS.defaults.font.family = "Roboto, sans-serif";
ChartJS.defaults.font.size = 14;
// maintainAspectRatio
ChartJS.defaults.maintainAspectRatio = false;
// plugins
ChartJS.defaults.plugins.title.display = true;
ChartJS.defaults.plugins.title.font = {
  family: "Roboto, sans-serif",
  size: 15,
  lineHeight: 1,
  weight: "bold"
};
