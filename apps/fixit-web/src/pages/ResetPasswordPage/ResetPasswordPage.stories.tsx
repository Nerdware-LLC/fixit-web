import { withRootAppLayoutDecorator, type LayoutDecoratorArgs } from "@/../.storybook/decorators";
import { ResetPasswordPage } from "./ResetPasswordPage.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/ResetPasswordPage",
  component: ResetPasswordPage,
  decorators: [withRootAppLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ResetPasswordPage & LayoutDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    _layout_decorator_args: {
      initialEntries: ["/reset-password?token=1234567890abcdef"],
    },
  },
} satisfies Story;
