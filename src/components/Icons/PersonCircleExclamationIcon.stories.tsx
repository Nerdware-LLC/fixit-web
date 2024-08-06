import { PersonCircleExclamationIcon as PersonCircleExclamationIconFC } from "./PersonCircleExclamationIcon.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Icons/PersonCircleExclamationIcon",
  component: PersonCircleExclamationIconFC,
  args: {
    style: { zoom: 5 },
  },
} satisfies Meta<typeof PersonCircleExclamationIconFC>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const PersonCircleExclamationIcon = {} satisfies Story;
