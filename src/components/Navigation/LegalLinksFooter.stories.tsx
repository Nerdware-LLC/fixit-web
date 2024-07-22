import * as legalLinksSB from "./LegalLinks.stories.js";
import { LegalLinksFooter, type LegalLinksFooterProps } from "./LegalLinksFooter.js";
import type { NavDecoratorArgs } from "@/../.storybook/decorators";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  ...legalLinksSB.default, // LegalLinks default meta export
  title: "Components/Navigation/LegalLinksFooter",
  component: LegalLinksFooter,
} satisfies Meta<LegalLinksFooterProps & NavDecoratorArgs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Default = legalLinksSB.Default satisfies Story;

export const WithLongLabels = legalLinksSB.WithLongLabels satisfies Story;
