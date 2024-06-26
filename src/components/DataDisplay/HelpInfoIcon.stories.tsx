import { HelpInfoIcon } from "./HelpInfoIcon.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/DataDisplay/HelpInfoIcon",
  component: HelpInfoIcon,
  args: {
    style: { zoom: 1, fontSize: "10rem" },
    tooltipProps: {
      componentsProps: {
        tooltip: {
          style: {
            zoom: 2,
          },
        },
      },
    },
  },
} satisfies Meta<typeof HelpInfoIcon>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const TooltipText = {
  args: {
    tooltip: "This is an informational tooltip.",
  },
} satisfies Story;

export const EmptyTooltipText = {
  args: {
    tooltip: "",
  },
} satisfies Story;
