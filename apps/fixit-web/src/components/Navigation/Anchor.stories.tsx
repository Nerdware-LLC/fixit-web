import Tooltip from "@mui/material/Tooltip";
import { Anchor } from "./Anchor.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Navigation/Anchor",
  component: Anchor,
  tags: ["autodocs"],
} satisfies Meta<typeof Anchor>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const ExternalURL = {
  args: { href: "https://storybook.js.org/" },
} satisfies Story;

export const ExternalURLWithTooltip = {
  args: {
    href: "https://storybook.js.org/",
  },
  render: () => (
    <Tooltip title="This is a tooltip">
      <Anchor href="https://storybook.js.org/" />
    </Tooltip>
  ),
} satisfies Story;

export const InternalRoute = {
  args: { children: "Foo anchor text" },
} satisfies Story;

export const InternalRouteWithTooltip = {
  render: () => (
    <Tooltip title="This is a tooltip">
      <Anchor>Hover over me for a tooltip!</Anchor>
    </Tooltip>
  ),
} satisfies Story;
