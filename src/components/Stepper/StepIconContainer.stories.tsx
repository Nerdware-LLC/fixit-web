import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { StepIconContainer } from "./StepIconContainer.jsx";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Stepper/StepIconContainer",
  component: StepIconContainer,
  tags: ["autodocs"],
  args: {
    // The default icon below is only used if a step has active:true and error:false
    icon: <DirectionsRunIcon />,
    style: { zoom: 4 },
  },
} satisfies Meta<typeof StepIconContainer>;

export default meta;

///////////////////////////////////////////////////////////
// STORIES

type Story = StoryObj<typeof meta>;

export const CompletedStep = {
  args: { completed: true },
} satisfies Story;

export const CurrentStep = {
  args: { active: true },
} satisfies Story;

export const ErrorStateStep = {
  args: { active: true, error: true },
} satisfies Story;

export const FutureStep = {} satisfies Story;
