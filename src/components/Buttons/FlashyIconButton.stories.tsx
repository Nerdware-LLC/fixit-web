import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FlashyIconButton } from "./FlashyIconButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Buttons/FlashyIconButton",
  component: FlashyIconButton,
  tags: ["autodocs"],
  render: ({ shouldInvertColors = true, style, ...args }) => (
    <FlashyIconButton
      shouldInvertColors={shouldInvertColors}
      style={{ zoom: 3, ...style }}
      aria-label="Flashy icon button"
      {...args}
    >
      <AddCircleIcon />
    </FlashyIconButton>
  ),
} satisfies Meta<typeof FlashyIconButton>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const BasicDemo = {} satisfies Story;
