import Box from "@mui/material/Box";
import { InvoiceStatusIcon } from "./InvoiceStatusIcon.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icons/InvoiceStatusIcon",
  component: InvoiceStatusIcon,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ "& svg": { zoom: 5 } }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof InvoiceStatusIcon>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Open = { args: { status: "OPEN" } } satisfies Story;
export const Closed = { args: { status: "CLOSED" } } satisfies Story;
export const Disputed = { args: { status: "DISPUTED" } } satisfies Story;
