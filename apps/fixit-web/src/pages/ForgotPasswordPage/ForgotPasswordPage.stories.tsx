import { withRootAppLayoutDecorator } from "@/../.storybook/decorators";
import { ForgotPasswordPage } from "./ForgotPasswordPage.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/ForgotPasswordPage",
  component: ForgotPasswordPage,
  decorators: [withRootAppLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ForgotPasswordPage>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {} satisfies Story;
