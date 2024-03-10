import { withRootAppLayoutDecorator } from "@/../.storybook/decorators";
import { PrivacyPolicyPage } from "./PrivacyPolicyPage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/PrivacyPolicyPage",
  component: PrivacyPolicyPage,
  decorators: [withRootAppLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PrivacyPolicyPage>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {} satisfies Story;
