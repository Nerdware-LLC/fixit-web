import { TitleLogo } from "./TitleLogo.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Branding/FixitLogoWithName",
  component: TitleLogo,
} satisfies Meta<typeof TitleLogo>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const FixitLogoWithName = {} satisfies Story;
