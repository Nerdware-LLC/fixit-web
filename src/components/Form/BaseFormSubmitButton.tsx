import { grid as muiGridSxProps, type GridProps as MuiGridSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import Button, { type ButtonProps } from "@mui/material/Button";
import { ButtonLoadingIndicator } from "@/components/Indicators/ButtonLoadingIndicator.jsx";
import type { Simplify } from "type-fest";

/**
 * A form submit button which shows a loading indicator when `isLoading` is `true`.
 *
 * > _This is used by `Form/FormSubmitButton` and `StripeForm/StripeFormSubmitButton`_.
 */
export const BaseFormSubmitButton = ({
  label,
  type = "button",
  isLoading,
  ...buttonProps
}: BaseFormSubmitButtonProps) => (
  <StyledButton type={type} {...buttonProps}>
    {isLoading ? <ButtonLoadingIndicator /> : label}
  </StyledButton>
);

const StyledButton = styled(Button, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<MuiGridSxProps>({
  height: "2.5rem",
  position: "relative",
  ...muiGridSxProps,
});

export type BaseFormSubmitButtonProps = Simplify<
  { label: string; isLoading: boolean } & Omit<ButtonProps, "children"> & MuiGridSxProps
>;
