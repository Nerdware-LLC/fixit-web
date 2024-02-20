import { TABLE_VIEW_DATA_SETS } from "@/layouts/CoreItemsListView/types";
import { ItemsPerMonthChart } from "./ItemsPerMonthChart";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Charts/ItemsPerMonthChart",
  component: ItemsPerMonthChart,
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
} satisfies Meta<typeof ItemsPerMonthChart>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

/**
 * These monthStartTimestamps reflect a 12-month period from June 2023 to May 2024.
 * All dates are the first day of the month at 00:00:00.
 */
const monthStartTimestamps = [
  1685592000000, // June 1, 2023 00:00:00
  1688184000000,
  1690862400000,
  1693540800000,
  1696132800000,
  1698811200000,
  1701406800000,
  1704085200000,
  1706763600000,
  1709269200000,
  1711944000000,
  1714536000000, // May 1, 2024 00:00:00
];

/**
 * Both the `Sent` and `Received` data sets must be deterministic for testing
 * purposes, BUT it's desirable for the 'BasicDemo' story to APPEAR random-ish
 * for aesthetic reasons, since using constants would create straight lines which
 * fail to demonstrate certain chart qualities like line-elasticity. To achieve
 * both aims, the data sets are generated by applying arbitrary arithmetic to
 * the 5th and 6th digits of each timestamp, which are "random" enough to achieve
 * the desired aesthetic.
 */
const { sentDataset, receivedDataset } = monthStartTimestamps.reduce(
  (
    accum: { sentDataset: Record<number, number>; receivedDataset: Record<number, number> },
    monthStartTimestamp,
    index
  ) => {
    const fifthDigit = Number(`${monthStartTimestamp}`[5]);
    const sixthDigit = Number(`${monthStartTimestamp}`[6]);
    // This ternary/arithmetic logic is arbitrary, just creates "nice-looking" lines
    accum.sentDataset[monthStartTimestamp] = sixthDigit < 2 ? sixthDigit + 3 : sixthDigit;
    accum.receivedDataset[monthStartTimestamp] = index < 4 ? 10 - fifthDigit : fifthDigit;

    return accum;
  },
  { sentDataset: {}, receivedDataset: {} }
);

export const BasicDemo = {
  args: {
    title: "Items Sent/Received per Month",
    monthStartTimestamps,
    datasets: [
      {
        label: TABLE_VIEW_DATA_SETS.SENT,
        borderColor: "#66ff66",
        data: sentDataset,
      },
      {
        label: TABLE_VIEW_DATA_SETS.RECEIVED,
        borderColor: "#4fc3f7",
        data: receivedDataset,
      },
    ],
    yAxisMaximum: 9,
  },
} satisfies Story;
