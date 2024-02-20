import { withRootAppLayoutDecorator } from "@/../.storybook/decorators";
import { ProductsPage } from "./ProductsPage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/ProductsPage",
  component: ProductsPage,
  decorators: [withRootAppLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ProductsPage>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {} satisfies Story;
