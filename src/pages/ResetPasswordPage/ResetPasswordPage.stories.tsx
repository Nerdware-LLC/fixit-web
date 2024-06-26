import { withNavDecorator, type NavDecoratorArgs } from "@/../.storybook/decorators";
import { ResetPasswordPage } from "./ResetPasswordPage.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/ResetPasswordPage",
  component: ResetPasswordPage,
  decorators: [withNavDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ResetPasswordPage & NavDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    _nav_decorator_args: {
      route: "/reset-password?token=1234567890abcdef",
    },
  },
} satisfies Story;
