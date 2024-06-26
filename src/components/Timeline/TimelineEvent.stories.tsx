import { BasicDemo as TimelineBasicDemo } from "./Timeline.stories.jsx";
import { TimelineEvent } from "./TimelineEvent.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Timeline/TimelineEvent",
  component: TimelineEvent,
} satisfies Meta<typeof TimelineEvent>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    ...TimelineBasicDemo.args.events[0],
  },
} satisfies Story;
