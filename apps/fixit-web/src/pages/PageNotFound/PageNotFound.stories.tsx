import { withRootAppLayoutDecorator } from "@/../.storybook/decorators";
import { PageNotFound } from "./PageNotFound.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/PageNotFound",
  component: PageNotFound,
  decorators: [withRootAppLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PageNotFound>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {} satisfies Story;
