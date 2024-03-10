import { stepClasses } from "@mui/material/Step";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { stepContentClasses } from "@mui/material/StepContent";
import { stepLabelClasses } from "@mui/material/StepLabel";
import { stepperClasses } from "@mui/material/Stepper";

/**
 * Class names for `Stepper` components (src/components/Stepper/).
 *
 * For convenience, this object includes the following Mui class-names objects:
 * - {@link stepperClasses} under the key `stepper`
 * - {@link stepClasses} under the key `step`
 * - {@link stepLabelClasses} under the key `stepLabel`
 * - {@link stepContentClasses} via the path `stepperClassNames.stepContent.muiStepContentWrapper`
 * - {@link stepConnectorClasses} under the key `stepConnector`
 */
export const stepperClassNames = {
  stepperContainer: "stepper-container",
  stepper: { ...stepperClasses },
  step: { ...stepClasses },
  stepLabel: { ...stepLabelClasses },
  stepContent: {
    muiStepContentWrapper: { ...stepContentClasses },
    container: "step-content__container",
    horizontal: "step-content__horizontal",
    vertical: "step-content__vertical",
    descriptionContainer: "step-description__container",
    actionButtonsContainer: "step-actions__buttons-container",
  },
  stepConnector: { ...stepConnectorClasses },
} as const;
