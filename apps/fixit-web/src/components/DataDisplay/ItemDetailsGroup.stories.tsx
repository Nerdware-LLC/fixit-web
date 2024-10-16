import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PhoneIcon from "@mui/icons-material/Phone";
import { ItemDetails } from "./ItemDetails.jsx";
import { ItemDetailsGroup } from "./ItemDetailsGroup.jsx";
import { LocationDetails } from "./LocationDetails.jsx";
import { BasicDemo as LocationDetailsBasicDemo } from "./LocationDetails.stories.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/DataDisplay/ItemDetailsGroup",
  component: ItemDetailsGroup,
} satisfies Meta<typeof ItemDetailsGroup>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    label: "Contact Profile",
    labelIcon: <AccountCircleIcon />,
    headerComponents: null,
    children: (
      <>
        <ItemDetails label="Email" labelIcon={<ContactMailIcon />}>
          human.person@example.com
        </ItemDetails>
        <ItemDetails label="Phone" labelIcon={<PhoneIcon />}>
          (555) 555-5555
        </ItemDetails>
        <LocationDetails {...LocationDetailsBasicDemo.args} />
      </>
    ),
  },
} satisfies Story;
