import { withRootAppLayoutDecorator } from "@/../.storybook/decorators";
import { LandingPage } from "./LandingPage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/LandingPage",
  component: LandingPage,
  decorators: [withRootAppLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LandingPage>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {} satisfies Story;
