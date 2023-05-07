import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import { FormSubmitButton, type FormSubmitButtonProps } from "@components/Form/FormSubmitButton";
import { BackButton, type BackButtonProps } from "@components/Navigation/BackButton";
import { formClassNames } from "./classNames";

export const FormControlButtons = ({
  FormSubmitButtonProps = {},
  BackButtonProps = {},
  ...containerProps
}: FormControlButtonsProps) => (
  <StyledBox className={formClassNames.controlButtonsContainer} {...containerProps}>
    <FormSubmitButton {...FormSubmitButtonProps} />
    <BackButton label="Cancel" {...BackButtonProps} />
  </StyledBox>
);

const StyledBox = styled(Box)(({ theme }) => ({
  height: "min-content",
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  ...(theme.variables.isMobilePageLayout
    ? {
        flexDirection: "column",
        marginTop: "1rem",
        marginBottom: "1rem",
      }
    : {
        flexDirection: "row",
      }),

  "& > button": {
    ...(theme.variables.isMobilePageLayout
      ? { width: "min(10rem, 35%)", margin: "0 auto" }
      : { width: "min-content", margin: "0" }),
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    lineHeight: "2rem",
    borderRadius: "1.5rem",
  },
}));

export type FormControlButtonsProps = {
  FormSubmitButtonProps?: FormSubmitButtonProps;
  BackButtonProps?: BackButtonProps;
} & BoxProps;
