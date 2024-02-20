import Box from "@mui/material/Box";
import { WorkOrderCategoryIcon } from "./WorkOrderCategoryIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icons/WorkOrderCategoryIcon",
  component: WorkOrderCategoryIcon,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box sx={{ "& svg": { zoom: 5 } }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof WorkOrderCategoryIcon>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Drywall = { args: { category: "DRYWALL" } } satisfies Story;
export const Electrical = { args: { category: "ELECTRICAL" } } satisfies Story;
export const Flooring = { args: { category: "FLOORING" } } satisfies Story;
export const General = { args: { category: "GENERAL" } } satisfies Story;
export const HVAC = { args: { category: "HVAC" } } satisfies Story;
export const Landscaping = { args: { category: "LANDSCAPING" } } satisfies Story;
export const Masonry = { args: { category: "MASONRY" } } satisfies Story;
export const Painting = { args: { category: "PAINTING" } } satisfies Story;
export const Paving = { args: { category: "PAVING" } } satisfies Story;
export const Pest = { args: { category: "PEST" } } satisfies Story;
export const Plumbing = { args: { category: "PLUMBING" } } satisfies Story;
export const Roofing = { args: { category: "ROOFING" } } satisfies Story;
export const Trash = { args: { category: "TRASH" } } satisfies Story;
export const Turnover = { args: { category: "TURNOVER" } } satisfies Story;
export const Windows = { args: { category: "WINDOWS" } } satisfies Story;
