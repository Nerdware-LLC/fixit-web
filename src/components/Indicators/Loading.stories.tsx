import { Loading } from "./Loading.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Indicators/Loading",
  component: Loading,
} satisfies Meta<typeof Loading>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  parameters: {
    layout: "padded",
  },
  args: {
    style: {
      position: "fixed",
      top: "calc(50% - 3.5rem)",
      left: "calc(50% - 3.5rem)",
    },
  },
} satisfies Story;
