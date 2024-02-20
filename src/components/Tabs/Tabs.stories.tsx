import Paper, { paperClasses } from "@mui/material/Paper";
import Text, { typographyClasses } from "@mui/material/Typography";
import { Tabs } from "./Tabs";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Paper elevation={0}>
        <Story />
      </Paper>
    ),
  ],
  parameters: {
    /* SB addon-actions currently breaks the `Tabs` component as implemented, so
    the addon is disabled for now. When a Mui Tab button is clicked, the addon logs
    the SyntheticEvent as expected, but the `Tabs` component's onChange handler fn,
    `handleChangeActiveTabIndex`, is not called, so the `activeTabIndex` state is
    not updated. I suspect this is due to the Tabs onChange handler fn being defined
    internally rather than an SB story/component `arg`.  */
    actions: false,
  },
} satisfies Meta<typeof Tabs>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    "aria-label": "storybook demo tabs",
    sx: {
      width: "clamp(320px, 50vw, 50vw)",
      [`& .${typographyClasses.root}`]: {
        backgroundColor: "transparent",
      },
    },
    tabsContentMap: {
      "Tab 1": (
        <Paper>
          <Text>Tab 1 content.</Text>
        </Paper>
      ),
      "Tab 2": (
        <Paper>
          <Text>Tab 2 content.</Text>
        </Paper>
      ),
      "Tab 3": (
        <Paper>
          <Text>Tab 3 content.</Text>
        </Paper>
      ),
    },
    tabPanelProps: {
      sx: {
        [`& > .${paperClasses.root}`]: {
          padding: "1rem",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
      },
    },
  },
} satisfies Story;
