import { AddressCardIcon as AddressCardIconFC } from "./AddressCardIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icons/AddressCardIcon",
  component: AddressCardIconFC,
  args: {
    style: { zoom: 5 },
  },
} satisfies Meta<typeof AddressCardIconFC>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const AddressCardIcon = {} satisfies Story;
