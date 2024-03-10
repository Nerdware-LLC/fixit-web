import { iconButtonClasses } from "@mui/material/IconButton";
import {
  withNavDecorator,
  withLayoutInfoDecorator,
  type NavDecoratorArgs,
} from "@/../.storybook/decorators";
import { CreateItemButton, type CreateItemButtonProps } from "./CreateItemButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Buttons/CreateItemButton",
  component: CreateItemButton,
  tags: ["autodocs"],
  args: {
    createItemFormPath: "/home/items/create",
    buttonText: "Create Item",
    sx: {
      [`&.${iconButtonClasses.root}`]: {
        zoom: 4, // enlarge the mobile btn
      },
    },
  },
  decorators: [withNavDecorator, withLayoutInfoDecorator],
} satisfies Meta<CreateItemButtonProps & NavDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const LayoutDependent = {} satisfies Story;
