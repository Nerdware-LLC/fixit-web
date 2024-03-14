import { withRootAppLayoutDecorator } from "@/../.storybook/decorators";
import { CookiePolicyPage } from "./CookiePolicyPage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/CookiePolicyPage",
  component: CookiePolicyPage,
  decorators: [withRootAppLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CookiePolicyPage>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {} satisfies Story;
