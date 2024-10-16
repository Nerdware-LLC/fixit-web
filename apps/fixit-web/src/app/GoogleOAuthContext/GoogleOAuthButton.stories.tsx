import { GoogleOAuthButton } from "./GoogleOAuthButton.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Buttons/GoogleOAuthButton",
  component: GoogleOAuthButton,
  decorators: [
    (Story) => (
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onSuccess: () => {
      console.debug(`◐ — [GoogleLogin] — onSuccess callback called!`);
    },
    type: "standard",
    size: "large",
    shape: "pill",
  },
} satisfies Meta<typeof GoogleOAuthButton>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    text: "signin_with",
  },
} satisfies Story;
