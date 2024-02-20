import { TrowelBricksIcon as TrowelBricksIconFC } from "./TrowelBricksIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icons/TrowelBricksIcon",
  component: TrowelBricksIconFC,
  args: {
    style: { zoom: 5 },
  },
} satisfies Meta<typeof TrowelBricksIconFC>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const TrowelBricksIcon = {} satisfies Story;
