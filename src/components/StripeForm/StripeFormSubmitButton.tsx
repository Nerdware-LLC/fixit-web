import {
  BaseFormSubmitButton,
  type BaseFormSubmitButtonProps,
} from "@/components/Form/BaseFormSubmitButton";
import type { SetOptional } from "type-fest";

export const StripeFormSubmitButton = ({
  label = "Subscribe",
  color = "primary",
  size = "large",
  disabled,
  isLoading,
  ...buttonProps
}: StripeFormSubmitButtonProps) => (
  <BaseFormSubmitButton
    type="submit"
    label={label}
    color={color}
    size={size}
    disabled={disabled}
    isLoading={isLoading}
    {...buttonProps}
  />
);

export type StripeFormSubmitButtonProps = SetOptional<
  Omit<BaseFormSubmitButtonProps, "type">,
  "label"
>;
