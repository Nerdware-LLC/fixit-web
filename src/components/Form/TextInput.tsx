import { StyledTextField, type StyledTextFieldProps } from "@components/Inputs/StyledTextField";
import { formClassNames } from "./classNames";
import { useFormikFieldProps } from "./useFormikFieldProps";
import type { AutoCompleteAttributeValue } from "./types";

export const TextInput = ({
  id,
  label: explicitLabel,
  placeholder: explicitPlaceholder,
  variant: explicitVariant,
  ...props
}: TextInputProps) => {
  const [{ value, ...textInputProps }] = useFormikFieldProps<string>({
    id,
    label: explicitLabel,
    placeholder: explicitPlaceholder,
    variant: explicitVariant,
  });

  return (
    <StyledTextField
      className={formClassNames.textInput}
      value={value ?? ""}
      {...textInputProps}
      {...props}
    />
  );
};

/**
 * Props for TextInput and related/derived components.
 */
export type TextInputProps = Omit<
  StyledTextFieldProps,
  "label" | "autoComplete" | "value" | "onChange" | "onBlur"
> & {
  id: string;
  label?: string;
  autoComplete?: AutoCompleteAttributeValue;
};
