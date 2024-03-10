import { DragonIcon as DragonIconFC } from "./DragonIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icons/DragonIcon",
  component: DragonIconFC,
  args: {
    style: { zoom: 5 },
  },
} satisfies Meta<typeof DragonIconFC>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const DragonIcon = {} satisfies Story;
