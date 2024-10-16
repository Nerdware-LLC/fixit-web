import Box from "@mui/material/Box";
import { WorkOrderStatusIcon } from "./WorkOrderStatusIcon.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icons/WorkOrderStatusIcon",
  component: WorkOrderStatusIcon,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ "& svg": { zoom: 5 } }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof WorkOrderStatusIcon>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Unassigned = { args: { status: "UNASSIGNED" } } satisfies Story;
export const Assigned = { args: { status: "ASSIGNED" } } satisfies Story;
export const InProgress = { args: { status: "IN_PROGRESS" } } satisfies Story;
export const Cancelled = { args: { status: "CANCELLED" } } satisfies Story;
export const Deferred = { args: { status: "DEFERRED" } } satisfies Story;
export const Complete = { args: { status: "COMPLETE" } } satisfies Story;
