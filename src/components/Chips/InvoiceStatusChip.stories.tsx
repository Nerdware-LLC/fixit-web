import { InvoiceStatusChip } from "./InvoiceStatusChip.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Chips/InvoiceStatusChip",
  component: InvoiceStatusChip,
  tags: ["autodocs"],
} satisfies Meta<typeof InvoiceStatusChip>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Open = { args: { status: "OPEN" } } satisfies Story;
export const Closed = { args: { status: "CLOSED" } } satisfies Story;
export const Disputed = { args: { status: "DISPUTED" } } satisfies Story;
