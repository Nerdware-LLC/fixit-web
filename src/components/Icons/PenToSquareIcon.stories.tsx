import { PenToSquareIcon as PenToSquareIconFC } from "./PenToSquareIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icons/PenToSquareIcon",
  component: PenToSquareIconFC,
  args: {
    style: { zoom: 5 },
  },
} satisfies Meta<typeof PenToSquareIconFC>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const PenToSquareIcon = {} satisfies Story;
