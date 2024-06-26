import { StripeBadge as StripeBadgeComponent } from "./StripeBadge.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Branding/StripeBadge",
  component: StripeBadgeComponent,
} satisfies Meta<typeof StripeBadgeComponent>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const StripeBadge = {
  args: {
    style: {
      height: "100%",
      width: "100%",
    },
  },
} satisfies Story;
