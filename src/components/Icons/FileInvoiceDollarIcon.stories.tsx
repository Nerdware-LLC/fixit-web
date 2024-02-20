import { FileInvoiceDollarIcon as FileInvoiceDollarIconFC } from "./FileInvoiceDollarIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icons/FileInvoiceDollarIcon",
  component: FileInvoiceDollarIconFC,
  args: {
    style: { zoom: 5 },
  },
} satisfies Meta<typeof FileInvoiceDollarIconFC>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const FileInvoiceDollarIcon = {} satisfies Story;
