import Text from "@mui/material/Typography";
import { ShimmerBox } from "./ShimmerBox.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Containers/ShimmerBox",
  component: ShimmerBox,
  args: {
    style: { zoom: 5 },
  },
} satisfies Meta<typeof ShimmerBox>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    children: <Text>Most Popular</Text>,
  },
} satisfies Story;
