import { Logo } from "./Logo";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Branding/FixitLogo",
  component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const FixitLogo = {} satisfies Story;
