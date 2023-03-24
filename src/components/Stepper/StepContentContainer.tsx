import Text from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { stepperClassNames as classNames } from "./classNames";
import type { StepperStepContentProps } from "./types";

/**
 * StepContent container which can be used for MuiStepper in both vertical and
 * horizontal layouts (the stock Mui StepContent el throws an error when used
 * in a horizontal layout).
 */
export const StepContentContainer = ({
  content: { description, stepActionButtons },
  useVerticalOrientation
}: StepperStepContentProps) => {
  const orientationClassName = useVerticalOrientation
    ? classNames.stepContent.vertical
    : classNames.stepContent.horizontal;

  return (
    <div className={`${classNames.stepContent.container} ${orientationClassName}`}>
      <div className={classNames.stepContent.descriptionContainer}>
        <InfoIcon />
        {typeof description === "string" ? <Text>{description}</Text> : description}
      </div>
      <div className={classNames.stepContent.actionButtonsContainer}>{stepActionButtons}</div>
    </div>
  );
};
