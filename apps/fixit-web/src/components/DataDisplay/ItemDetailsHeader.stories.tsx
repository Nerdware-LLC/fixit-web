import ContactMailIcon from "@mui/icons-material/ContactMail";
import { ItemDetailsHeader } from "./ItemDetailsHeader.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/DataDisplay/ItemDetailsHeader",
  component: ItemDetailsHeader,
} satisfies Meta<typeof ItemDetailsHeader>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    label: "Contact Email",
    labelIcon: <ContactMailIcon />,
  },
} satisfies Story;
