import { themes } from "@storybook/theming";
import { globalDecorators } from "./decorators";
import { customUserAgents } from "./userAgents";
import { customViewports } from "./viewports";
import type { Preview } from "@storybook/react";

export default {
  decorators: globalDecorators,
  parameters: {
    controls: {
      expanded: true, // Adds the description and default columns
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: "requiredFirst",
    },
    docs: {
      toc: true,
      theme: themes.dark, // Using `ensure` fn from `@storybook/theming` broke docs pages
    },
    layout: "centered",
    userAgent: customUserAgents,
    viewport: {
      viewports: customViewports,
    },
  },
} satisfies Preview;
