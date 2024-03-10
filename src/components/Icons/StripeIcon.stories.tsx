import { StripeIcon as StripeIconFC } from "./StripeIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icons/StripeIcon",
  component: StripeIconFC,
  args: {
    style: { zoom: 5 },
  },
} satisfies Meta<typeof StripeIconFC>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const StripeIcon = {} satisfies Story;
