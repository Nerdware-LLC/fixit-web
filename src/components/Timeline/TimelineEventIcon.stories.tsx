import CalendarDateIcon from "@mui/icons-material/InsertInvitation";
import { TimelineEventIcon } from "./TimelineEventIcon";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Timeline/TimelineEventIcon",
  component: TimelineEventIcon,
  tags: ["autodocs"],
  parameters: {
    controls: {
      include: ["icon", "iconHighlight"],
    },
  },
  args: {
    icon: <CalendarDateIcon />,
  },
} satisfies Meta<typeof TimelineEventIcon>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Blue = { args: { iconHighlight: "blue" } } satisfies Story;
export const Green = { args: { iconHighlight: "green" } } satisfies Story;
export const Yellow = { args: { iconHighlight: "yellow" } } satisfies Story;
export const Red = { args: { iconHighlight: "red" } } satisfies Story;
export const Secondary = { args: { iconHighlight: "secondary" } } satisfies Story;
export const Primary = { args: { iconHighlight: "primary" } } satisfies Story;
