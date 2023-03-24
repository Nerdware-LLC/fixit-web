import type { StepperProps as MuiStepperProps } from "@mui/material/Stepper";
import type { StepProps } from "@mui/material/Step";
import type { StepLabelProps } from "@mui/material/StepLabel";

// STEPPER:

export interface StepperOrientation {
  useVerticalOrientation?: boolean;
}

export type StepperProps = {
  steps: StepperOrderedStepConfigs;
  activeStepIndex: number;
  useAltLabel?: boolean;
  StepIconComponent?: StepLabelProps["StepIconComponent"];
} & StepperOrientation &
  Omit<MuiStepperProps, "activeStep" | "oritentation" | "alternativeLabel">;

export type StepperOrderedStepConfigs = Array<StepperStepConfig>;

export type StepperStepConfig = {
  label: string;
  caption?: React.ReactNode;
  showErrorStyling?: boolean;
  stepProps?: Partial<StepProps>;
  stepLabelProps?: Omit<Partial<StepLabelProps>, "StepIconComponent">;
} & Partial<StepperStepContentProps>;

// STEPPER CONTENT:

export type StepperStepContentProps = {
  content: {
    description?: React.ReactNode;
    stepActionButtons?: React.ReactNode;
  };
} & StepperOrientation;
