import { withNavDecorator, type NavDecoratorArgs } from "@/../.storybook/decorators";
import { LegalLinks, type LegalLinksProps } from "./LegalLinks";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Navigation/LegalLinks",
  component: LegalLinks,
  tags: ["autodocs"],
  decorators: [
    withNavDecorator,
    (Story) => (
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<LegalLinksProps & NavDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithStripeBadge = {
  args: {
    includeStripeBadge: true,
  },
} satisfies Story;
