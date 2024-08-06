import { ItemDetails } from "./ItemDetails.jsx";
import { BasicDemo as ItemDetailsHeaderBasicDemo } from "./ItemDetailsHeader.stories.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/DataDisplay/ItemDetails",
  component: ItemDetails,
  tags: ["autodocs"],
} satisfies Meta<typeof ItemDetails>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    ...ItemDetailsHeaderBasicDemo.args,
    children: "human.person@example.com",
  },
} satisfies Story;

export const WithFallbackContent = {
  args: {
    ...ItemDetailsHeaderBasicDemo.args,
  },
} satisfies Story;
