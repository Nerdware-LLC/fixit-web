import { RoadIcon as RoadIconFC } from "./RoadIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icons/RoadIcon",
  component: RoadIconFC,
  args: {
    style: { zoom: 5 },
  },
} satisfies Meta<typeof RoadIconFC>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const RoadIcon = {} satisfies Story;
