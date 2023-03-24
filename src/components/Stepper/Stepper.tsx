import { styled } from "@mui/material/styles";
import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Text, { typographyClasses } from "@mui/material/Typography";
import { StepIconContainer } from "./StepIconContainer";
import { StepContentContainer } from "./StepContentContainer";
import { stepperClassNames as classNames } from "./classNames";
import type { StepperProps } from "./types";

/**
 * A Mui `Stepper` component with app-specific logic and styles.
 *
 * @see https://mui.com/material-ui/react-stepper
 */
export const Stepper = ({
  steps,
  activeStepIndex,
  useVerticalOrientation = true,
  useAltLabel = !useVerticalOrientation,
  StepIconComponent = StepIconContainer,
  ...stepperProps
}: StepperProps) => (
  <StyledStepperContainer className={classNames.stepperContainer}>
    <MuiStepper
      activeStep={activeStepIndex}
      orientation={useVerticalOrientation ? "vertical" : "horizontal"}
      alternativeLabel={useAltLabel}
      {...stepperProps}
    >
      {steps.map(
        (
          {
            label,
            caption,
            showErrorStyling = false,
            content = {},
            stepProps = {},
            stepLabelProps = {}
          },
          index
        ) => (
          <Step key={label} {...stepProps}>
            <StepLabel
              StepIconComponent={StepIconComponent}
              error={showErrorStyling}
              optional={
                index <= activeStepIndex &&
                (typeof caption === "string" ? (
                  <Text variant="caption" color="gray">
                    {caption}
                  </Text>
                ) : (
                  caption
                ))
              }
              {...stepLabelProps}
            >
              {`${index + 1}. ${label}`}
            </StepLabel>
            {useVerticalOrientation && index === activeStepIndex && content && (
              // The Mui StepContent wrapper is only used with VERTICAL layout, otherwise an error is shown in console
              <StepContent>
                <StepContentContainer content={content} useVerticalOrientation={true} />
              </StepContent>
            )}
          </Step>
        )
      )}
    </MuiStepper>
    {!useVerticalOrientation && steps[activeStepIndex]?.content && (
      <StepContentContainer
        content={{ ...steps[activeStepIndex].content }}
        useVerticalOrientation={false}
      />
    )}
  </StyledStepperContainer>
);

const StyledStepperContainer = styled("div")(({ theme: { palette, variables } }) => {
  // Layout-dependent padding/margin values:
  const { iconContainerSize, iconContainerMarginRight, stepCaptionMarginLeft } =
    variables.isMobilePageLayout
      ? {
          iconContainerSize: "2.25rem",
          iconContainerMarginRight: "0.5rem",
          stepCaptionMarginLeft: "1rem"
        }
      : {
          iconContainerSize: "3rem",
          iconContainerMarginRight: "0.75rem",
          stepCaptionMarginLeft: 0
        };

  // Light/Dark mode-dependent values:
  const connectorColor = palette.mode === "dark" ? "#757575" : "rgba(0,0,0,0.87)";

  return {
    width: "auto",
    alignSelf: "center",

    [`& > .${classNames.stepper.root}`]: {
      /* STEPPER

        On MOBILE:
          - Stepper uses VERTICAL layout, so Stepper is a flex COLUMN
          - AltLabel IS NOT used, so StepConnectors are direct children of the Stepper, and siblings of Step-roots.

        On DESKTOP:
          - Stepper uses HORIZONTAL layout, so Stepper is a flex ROW
          - AltLabel IS used, so StepConnectors are direct children of the Steps, and siblings of StepLabel-roots.
      */

      // TODO replace isMobilePageLayout with VERTICAL/HORIZONTAL selectors

      // STEPS
      [`& > .${classNames.step.root}`]: {
        // Set a min-width for steps in horizontal layout
        [`&.${classNames.step.horizontal}`]: {
          minWidth: "max(15rem, fit-content)"
        },

        /* The below css provides a small connector extension above+below/left+right of
        step icon containers depending on the orientation (ignores first and last steps),
        which is sometimes necessary for gaps not to appear in the connectors. The icon
        containers do not receive the orientation-class, hence the nested selectors. */
        [`&:not(:first-of-type):not(:last-of-type)`]: {
          [`& .${classNames.stepLabel.iconContainer}`]: {
            position: "relative",
            zIndex: 1,
            "&::after": {
              overflow: "hidden",
              position: "absolute",
              zIndex: -1,
              content: '""',
              display: "inline-block",
              alignSelf: "center"
            }
          },
          [`&.${classNames.step.vertical} .${classNames.stepLabel.iconContainer}::after`]: {
            left: `calc( ${iconContainerSize} / 2 )`,
            height: "calc(100% + 3rem)",
            borderLeft: `1px solid ${connectorColor}`
          },
          [`&.${classNames.step.horizontal} .${classNames.stepLabel.iconContainer}::after`]: {
            top: `calc( ${iconContainerSize} / 2 )`,
            left: "-50%",
            width: "calc(100% + 6rem)",
            borderBottom: `1px solid ${connectorColor}`
          }
        },

        // STEP LABELS
        [`& > .${classNames.stepLabel.root}`]: {
          // step-label-root is a flex row on VERTICAL, flex col on HORIZONTAL
          padding: 0,

          [`&.${classNames.stepLabel.horizontal}`]: {
            minWidth: "10rem"
          },

          [`& > .${classNames.stepLabel.iconContainer}`]: {
            width: iconContainerSize,
            height: iconContainerSize
          },

          // On VERTICAL, the iconContainer's padding is replaced with margin
          [`&.${classNames.stepLabel.vertical} > .${classNames.stepLabel.iconContainer}`]: {
            padding: 0,
            marginRight: iconContainerMarginRight
          },

          [`& > .${classNames.stepLabel.labelContainer}`]: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            whiteSpace: "nowrap",

            [`& > .${classNames.stepLabel.label}`]: {
              color: palette.text.primary,

              // If it's not the active step, add some opacity
              [`&:not(.${classNames.stepLabel.active})`]: {
                opacity: 0.75
              },

              [`&.${classNames.stepLabel.active}`]: { color: palette.primary.main },
              [`&.${classNames.stepLabel.disabled}`]: { color: palette.text.disabled },
              [`&.${classNames.stepLabel.error}`]: { color: palette.error.main }
            },

            // The optional Step text (not MuiStepLabel-label is used in case a non-caption ReactNode is provided)
            [`& > .${typographyClasses.root}:not(.${classNames.stepLabel.label})`]: {
              marginLeft: stepCaptionMarginLeft,
              lineHeight: "1rem",
              whiteSpace: "pre"
            }
          }
        },

        // MUI STEP CONTENT - VERTICAL (MuiStepContentWrapper not used in HORIZONTAL, it errors if you do)
        [`& > .${classNames.stepContent.muiStepContentWrapper.root}`]: {
          /* On the vertical orientation, Content uses left-border to emulate a StepConnector (SC).
          Left-margin pushes content's left-border rightward to appear in line with the actual SC;
          left-padding pushes content's text rightward to appear in line with the label.  */
          marginLeft: `calc( ${iconContainerSize} / 2 )`,
          paddingLeft: `calc( ${iconContainerSize} / 2 + ${iconContainerMarginRight} + ${stepCaptionMarginLeft} )`, // lines up w caption
          paddingRight: 0
        }
      }
    },

    // StepContentContainer
    [`& .${classNames.stepContent.container}`]: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem", // spacing between text and btn, if one is present

      // StepContentContainer - VERTICAL
      [`&.${classNames.stepContent.vertical}`]: {
        alignItems: "flex-start",
        [`& .${classNames.stepContent.descriptionContainer}`]: {
          padding: "0.5rem 0",
          "& > svg[data-testid=InfoIcon]": {
            display: "none" // rm the InfoIcon on vert
          }
        }
      },

      // StepContentContainer - HORIZONTAL
      [`&.${classNames.stepContent.horizontal}`]: {
        alignItems: "center",
        paddingTop: "1.25rem", // matches ItemDetailsGroup padding-bottom
        [`& .${classNames.stepContent.descriptionContainer}`]: {
          [`& .${typographyClasses.root}`]: {
            whiteSpace: "nowrap"
          }
        }
      },

      [`& .${classNames.stepContent.descriptionContainer}`]: {
        display: "flex", // row
        alignItems: "center", // for aligning icon on horizontal (irrelevant on vert layout)
        gap: "0.5rem", // spacing between text and icon, if one is present

        [`& .${typographyClasses.root}`]: {
          fontSize: "1rem",
          lineHeight: "1.25rem"
        }
      },

      [`& > .${classNames.stepContent.actionButtonsContainer}`]: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }
    },

    // STEP CONNECTORS (on mobile, SC's are children of Stepper; on desktop, SC's are children of the STEPS due to AltLabel)
    [`& .${classNames.stepConnector.root}`]: {
      // VERTICAL
      [`&.${classNames.stepConnector.vertical}`]: {
        // No AltLabel on vert, so marginLeft is used to center the line
        marginLeft: `calc( ${iconContainerSize} / 2 )`
      },
      // HORIZONTAL
      [`&.${classNames.stepConnector.horizontal}`]: {
        // AltLabel is used here, so these are abs' positioned and TOP is used
        top: `calc( ${iconContainerSize} / 2 )`
      }
    }
  };
});