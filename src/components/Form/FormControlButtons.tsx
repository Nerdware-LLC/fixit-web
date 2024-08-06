import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import { BackButton, type BackButtonProps } from "@/components/Navigation/BackButton.jsx";
import { FormSubmitButton, type FormSubmitButtonProps } from "./FormSubmitButton.jsx";
import { formClassNames } from "./classNames.js";

/**
 * A `Form` component which includes `<FormSubmitButton />` and `<BackButton />` components
 * for convenience. The buttons are contained within a flex-box.
 */
export const FormControlButtons = ({
  FormSubmitButtonProps = {},
  BackButtonProps = {},
  className = "",
  ...boxProps
}: FormControlButtonsProps) => (
  <StyledBox className={formClassNames.controlButtonsContainer + " " + className} {...boxProps}>
    <FormSubmitButton {...FormSubmitButtonProps} />
    <BackButton label="Cancel" {...BackButtonProps} />
  </StyledBox>
);

const StyledBox = styled(Box)(({ theme: { variables } }) => ({
  height: "max-content",
  display: "flex",
  flexDirection: variables.isMobilePageLayout ? "column" : "row",
  alignItems: "center",
  gap: "inherit",

  "& > button": {
    ...(variables.isMobilePageLayout
      ? { width: "min(10rem, 35%)", margin: "0 auto" }
      : { width: "min-content", margin: "0" }),
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    borderRadius: "1.5rem",
  },
}));

export type FormControlButtonsProps = {
  FormSubmitButtonProps?: FormSubmitButtonProps;
  BackButtonProps?: BackButtonProps;
} & Omit<BoxProps, "children">;
