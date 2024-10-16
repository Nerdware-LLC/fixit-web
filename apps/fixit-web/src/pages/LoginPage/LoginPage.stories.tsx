import { withRootAppLayoutDecorator } from "@/../.storybook/decorators";
import { LoginPage } from "./LoginPage.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/LoginPage",
  component: LoginPage,
  decorators: [withRootAppLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LoginPage>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {} satisfies Story;
