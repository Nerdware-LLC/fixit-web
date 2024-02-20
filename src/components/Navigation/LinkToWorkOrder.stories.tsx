import { withNavDecorator } from "@/../.storybook/decorators";
import { LinkToWorkOrder } from "./LinkToWorkOrder";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Navigation/LinkToWorkOrder",
  component: LinkToWorkOrder,
  tags: ["autodocs"],
  decorators: [withNavDecorator],
  args: {
    workOrderID: "WO#1",
  },
} satisfies Meta<typeof LinkToWorkOrder>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const CustomContent = {
  args: {
    children: "Custom link text",
  },
} satisfies Story;
