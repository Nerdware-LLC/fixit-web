import Button from "@mui/material/Button";
import { Stepper } from "./Stepper.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Stepper/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  args: {
    steps: [
      {
        label: "Foo completed step",
        caption: "This step has been completed.",
      },
      {
        label: "Foo active step",
        caption: "This shows a step in an error state.",
        content: {
          description: "This is the description for step 2.",
          stepActionButtons: (
            <Button onClick={() => alert("You clicked the Step 2 btn")}>Step 2 btn</Button>
          ),
        },
        showErrorStyling: true,
      },
      {
        label: "Foo future step",
        caption: "Not here yet",
      },
    ],
    activeStepIndex: 1,
  },
} satisfies Meta<typeof Stepper>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Vertical = {
  args: {
    useVerticalOrientation: true,
  },
} satisfies Story;

export const Horizontal = {
  args: {
    useVerticalOrientation: false,
  },
} satisfies Story;
