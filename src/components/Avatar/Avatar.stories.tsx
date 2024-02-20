import { Avatar } from "./Avatar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Avatar/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    containerProps: {
      style: { zoom: 3 },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const ImageWithDisplayName = {
  args: {
    showDisplayName: true,
    profile: {
      displayName: "Guy McPerson",
      photoUrl: "https://freesvg.org/img/Linux-Avatar.png",
    },
  },
} satisfies Story;

export const Image = {
  args: {
    src: ImageWithDisplayName.args.profile.photoUrl,
  },
} satisfies Story;

export const Initial = {
  args: {
    profile: {
      displayName: ImageWithDisplayName.args.profile.displayName,
    },
  },
} satisfies Story;
