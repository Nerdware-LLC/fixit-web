import { styled } from "@mui/material/styles";
import StepContent from "@mui/material/StepContent";
import Text, { typographyClasses } from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { stepperClassNames as classNames } from "./classNames.js";
import type { StepperStepContentProps } from "./types.js";

/**
 * StepContent container which can be used for MuiStepper in both vertical and horizontal layouts.
 *
 * > The stock [Mui StepContent element](https://mui.com/material-ui/api/step-content/) throws an
 *   error if used in a horizontal layout.
 */
export const StepContentContainer = ({
  content: { description, stepActionButtons },
  useVerticalOrientation,
}: StepperStepContentProps) => {
  const orientationClassName = useVerticalOrientation
    ? classNames.stepContent.vertical
    : classNames.stepContent.horizontal;

  const baseStepContent = (
    <StyledDiv className={`${classNames.stepContent.container} ${orientationClassName}`}>
      <div className={classNames.stepContent.descriptionContainer}>
        <InfoIcon />
        {typeof description === "string" ? <Text>{description}</Text> : description}
      </div>
      <div className={classNames.stepContent.actionButtonsContainer}>{stepActionButtons}</div>
    </StyledDiv>
  );

  // The Mui StepContent wrapper is only used in the VERTICAL layout
  return useVerticalOrientation ? <StepContent>{baseStepContent}</StepContent> : baseStepContent;
};

const StyledDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem", // spacing between text and btn, if one is present

  // StepContentContainer - VERTICAL
  [`&.${classNames.stepContent.vertical}`]: {
    alignItems: "flex-start",
    [`& .${classNames.stepContent.descriptionContainer}`]: {
      padding: "0.5rem 0",
      "& > svg[data-testid=InfoIcon]": {
        display: "none", // rm the InfoIcon on vert
      },
    },
  },

  // StepContentContainer - HORIZONTAL
  [`&.${classNames.stepContent.horizontal}`]: {
    alignItems: "center",
    paddingTop: "1.25rem", // matches ItemDetailsGroup padding-bottom
    [`& .${classNames.stepContent.descriptionContainer}`]: {
      [`& .${typographyClasses.root}`]: {
        whiteSpace: "nowrap",
      },
    },
  },

  [`& .${classNames.stepContent.descriptionContainer}`]: {
    display: "flex", // row
    alignItems: "center", // for aligning icon on horizontal (irrelevant on vert layout)
    gap: "0.5rem", // spacing between text and icon, if one is present

    [`& .${typographyClasses.root}`]: {
      fontSize: "1rem",
    },
  },

  [`& > .${classNames.stepContent.actionButtonsContainer}`]: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
});
