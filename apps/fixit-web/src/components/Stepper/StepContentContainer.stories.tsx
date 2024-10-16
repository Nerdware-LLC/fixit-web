import Button from "@mui/material/Button";
import MuiStep from "@mui/material/Step";
import MuiStepper from "@mui/material/Stepper";
import { StepContentContainer } from "./StepContentContainer.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Stepper/StepContentContainer",
  component: StepContentContainer,
  tags: ["autodocs"],
  args: {
    content: {
      description: "This is a step description.",
      stepActionButtons: (
        <Button onClick={() => alert(`You clicked the "Do Step Action Btn" 🎉`)}>
          Do Step Action Btn
        </Button>
      ),
    },
  },
} satisfies Meta<typeof StepContentContainer>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const Vertical = {
  args: {
    useVerticalOrientation: true,
  },
  // The vert-oriented StepContentContainer must be a desc of Mui's Stepper+Step components.
  decorators: [
    (Story, { args }) => (
      <MuiStepper orientation="vertical">
        <MuiStep>
          <Story {...args} />
        </MuiStep>
      </MuiStepper>
    ),
  ],
} satisfies Story;

export const Horizontal = {
  args: {
    useVerticalOrientation: false,
  },
} satisfies Story;
