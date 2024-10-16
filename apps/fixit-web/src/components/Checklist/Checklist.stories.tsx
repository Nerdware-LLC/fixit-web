import { Checklist } from "./Checklist.jsx";
import { ChecklistItem } from "./ChecklistItem.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Checklist/Checklist (Non-Interactive)",
  component: Checklist,
  tags: ["autodocs"],
  args: {
    renderChecklistItem: ({ item }) => <ChecklistItem key={item.id} item={item} />,
  },
} satisfies Meta<typeof Checklist>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    checklistItems: [
      { id: "checklist-item-1", description: "Do a thing", isCompleted: true },
      { id: "checklist-item-2", description: "Also, do another thing", isCompleted: true },
      { id: "checklist-item-3", description: "Feed penguins", isCompleted: true },
      { id: "checklist-item-4", description: "Invent interdimensional travel", isCompleted: false },
      { id: "checklist-item-5", description: "Finish Baldur's Gate 3", isCompleted: false },
    ],
  },
} satisfies Story;

export const Empty = {
  args: {
    checklistItems: [],
    style: { minWidth: "8rem" },
  },
} satisfies Story;
