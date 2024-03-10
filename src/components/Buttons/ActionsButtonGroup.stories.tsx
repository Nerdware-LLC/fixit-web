import Box from "@mui/material/Box";
import { ActionsButtonGroup } from "./ActionsButtonGroup";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Buttons/ActionsButtonGroup",
  component: ActionsButtonGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box
        sx={{
          "& > .MuiButtonGroup-root,.MuiPopper-root": {
            width: "12rem",
            "&.MuiPopper-root li.MuiMenuItem-root": {
              justifyContent: "center",
            },
          },
        }}
      >
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof ActionsButtonGroup>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {
  args: {
    options: [
      {
        label: "Option 1",
        handleClick: () => console.log("Option 1 clicked!"),
        isPrimary: true,
      },
      {
        label: "Option 2",
        handleClick: () => console.log("Option 2 clicked!"),
      },
      {
        label: "Option 3",
        handleClick: () => console.log("Option 3 clicked!"),
      },
    ],
  },
} satisfies Story;
