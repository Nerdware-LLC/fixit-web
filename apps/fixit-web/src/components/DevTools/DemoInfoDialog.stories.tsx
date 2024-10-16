import { withNavDecorator } from "@/../.storybook/decorators";
import { DemoInfoDialog } from "./DemoInfoDialog.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/DevTools/DemoInfoDialog",
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
    closeDialog: () => {}, // required prop, set to no-op
  },
} satisfies Story;
