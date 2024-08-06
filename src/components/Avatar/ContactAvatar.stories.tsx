import { expect, within, userEvent } from "@storybook/test";
import {
  withNavDecorator,
  type NavDecoratorArgs,
} from "@/../.storybook/decorators/NavDecorator.jsx";
import { ContactAvatar, type ContactAvatarProps } from "./ContactAvatar.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Avatar/ContactAvatar",
  component: ContactAvatar,
  tags: ["autodocs"],
  args: {
    containerProps: {
      style: { zoom: 3 },
    },
    tooltipProps: {
      componentsProps: {
        tooltip: {
          style: { zoom: 2, transform: "translate(55%, 350%)" },
        },
      },
    },
  },
  decorators: [withNavDecorator],
} satisfies Meta<ContactAvatarProps & NavDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

const MOCK_CONTACT_NAME = "Astarion Ancunín";

export const ImageWithDisplayName = {
  args: {
    showDisplayName: true, // default
    contact: {
      id: "CONTACT#1",
      handle: "@rogue_vamp",
      profile: {
        displayName: MOCK_CONTACT_NAME,
        photoUrl: "https://bg3.wiki/w/images/thumb/0/00/Astarion-ea.jpg/800px-Astarion-ea.jpg",
      },
    },
  },
  play: async ({ canvasElement }) => {
    // onHover, tooltip should show with text "View contact: <displayName>"
    await userEvent.hover(within(canvasElement).getByAltText(MOCK_CONTACT_NAME));
    // quick delay to allow tooltip to render:
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // tooltip should be visible with desired text:
    await expect(
      within(canvasElement.ownerDocument.body).getByText(`View contact: ${MOCK_CONTACT_NAME}`)
    ).toBeInTheDocument();
  },
} satisfies Story;

export const Image = {
  args: {
    ...ImageWithDisplayName.args,
    showDisplayName: false,
  },
} satisfies Story;

export const NonClickable = {
  args: {
    ...ImageWithDisplayName.args,
    viewContactOnClick: false,
  },
} satisfies Story;
