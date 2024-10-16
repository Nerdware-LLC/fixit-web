import Tooltip from "@mui/material/Tooltip";
import { withNavDecorator, type NavDecoratorArgs } from "@/../.storybook/decorators";
import { Link, type LinkProps } from "./Link.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Navigation/Link",
  component: Link,
  tags: ["autodocs"],
  decorators: [withNavDecorator],
  args: {
    to: "/foo-rel-path",
    children: "Foo anchor text",
  },
} satisfies Meta<LinkProps & NavDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const LinkWithTooltip = {
  render: ({ to }) => (
    <Tooltip title="This is a tooltip">
      <Link to={to}>Hover over me for a tooltip!</Link>
    </Tooltip>
  ),
} satisfies Story;
