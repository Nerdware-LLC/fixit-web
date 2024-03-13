import { withNavDecorator } from "@/../.storybook/decorators";
import { DemoInfoDialog } from "./DemoInfoDialog";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Alerts/DemoInfoDialog",
  component: DemoInfoDialog,
  decorators: [withNavDecorator],
} satisfies Meta<typeof DemoInfoDialog>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    isVisible: true,
  },
} satisfies Story;
