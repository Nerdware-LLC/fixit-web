import { stepperClasses } from "@mui/material/Stepper";
import { stepClasses } from "@mui/material/Step";
import { stepLabelClasses } from "@mui/material/StepLabel";
import { stepContentClasses } from "@mui/material/StepContent";
import { stepConnectorClasses } from "@mui/material/StepConnector";

/**
 * Stepper classNames object with both custom and Mui-provided classNames.
 */
export const stepperClassNames = {
  stepperContainer: "stepper-container",
  stepper: { ...stepperClasses },
  step: { ...stepClasses },
  stepLabel: { ...stepLabelClasses },
  stepContent: {
    muiStepContentWrapper: { ...stepContentClasses },
    container: "step-content-container",
    horizontal: "step-content-horizontal",
    vertical: "step-content-vertical",
    descriptionContainer: "step-description-container",
    actionButtonsContainer: "step-actions-buttons-container"
  },
  stepConnector: { ...stepConnectorClasses }
};
