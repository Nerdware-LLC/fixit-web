import { LineChart } from "./LineChart.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Charts/LineChart",
  component: LineChart,
  tags: ["autodocs"],
  decorators: [
    // Outer div centers the chart, inner div sets concrete dimensions for chartjs canvas
    (Story) => (
      <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}>
        <div style={{ height: "clamp(25rem, 60vh, 60vh)", width: "clamp(30rem, 55vw, 55vw)" }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LineChart>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    title: "YoY Earnings Demo",
    data: {
      labels: [1, 4, 8, 12].map((i) => new Date(2023, i, 1, 0, 0, 0, 0).valueOf()),
      datasets: [
        {
          label: "Current Fiscal Year",
          data: [7.7, 5.25, 6.8, 9.8],
          borderColor: "#66ff66",
        },
        {
          label: "Previous Fiscal Year",
          data: [3.1, 6.5, 4.5, 7.7],
          borderColor: "#4fc3f7",
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "timeseries",
          time: {
            unit: "quarter",
            minUnit: "quarter",
            displayFormats: { quarter: "[Q]Q" },
            tooltipFormat: "[Q]Q",
          },
          title: {
            text: "Fiscal Quarter",
            display: true,
          },
        },
        y: {
          type: "linear",
          title: {
            text: "$ Millions",
            display: true,
          },
          min: 3,
          max: 10,
        },
      },
    },
  },
} satisfies Story;
