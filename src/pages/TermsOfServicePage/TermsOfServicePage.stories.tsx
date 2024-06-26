import { withRootAppLayoutDecorator } from "@/../.storybook/decorators";
import { TermsOfServicePage } from "./TermsOfServicePage.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Pages/TermsOfServicePage",
  component: TermsOfServicePage,
  decorators: [withRootAppLayoutDecorator],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TermsOfServicePage>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {} satisfies Story;
