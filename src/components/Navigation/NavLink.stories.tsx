import Tooltip from "@mui/material/Tooltip";
import { withNavDecorator, type NavDecoratorArgs } from "@/../.storybook/decorators";
import { NavLink, type NavLinkProps } from "./NavLink";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Navigation/NavLink",
  component: NavLink,
  tags: ["autodocs"],
  decorators: [withNavDecorator],
  args: {
    to: "/foo-rel-path",
    children: "Foo anchor text",
  },
} satisfies Meta<NavLinkProps & NavDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const LinkWithTooltip = {
  render: ({ to }) => (
    <Tooltip title="This is a tooltip">
      <NavLink to={to}>Hover over me for a tooltip!</NavLink>
    </Tooltip>
  ),
} satisfies Story;
