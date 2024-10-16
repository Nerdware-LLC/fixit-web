import BusinessIcon from "@mui/icons-material/Business";
import { LocationDetails as LocationDetailsFC } from "./LocationDetails.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/DataDisplay/LocationDetails",
  component: LocationDetailsFC,
} satisfies Meta<typeof LocationDetailsFC>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    location: {
      region: "CA",
      city: "Mountain View",
      streetLine1: "1600 Amphitheatre Parkway",
    },
    labelIcon: <BusinessIcon />,
  },
} satisfies Story;
