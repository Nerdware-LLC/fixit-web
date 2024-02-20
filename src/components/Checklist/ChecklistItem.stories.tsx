import { BasicDemo } from "./Checklist.stories";
import { ChecklistItem } from "./ChecklistItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Checklist/ChecklistItem (Non-Interactive)",
  component: ChecklistItem,
  tags: ["autodocs"],
} satisfies Meta<typeof ChecklistItem>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Completed = {
  name: "Completed",
  args: {
    item: {
      ...BasicDemo.args.checklistItems[0],
      isCompleted: true,
    },
  },
} satisfies Story;

export const NotCompleted = {
  args: {
    item: {
      ...BasicDemo.args.checklistItems[0],
      isCompleted: false,
    },
  },
} satisfies Story;
