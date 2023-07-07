import { StyledTextField } from "@components/Inputs/StyledTextField";
import {
  PatternFormatTextInput,
  type PatternFormatTextInputProps,
} from "@components/Inputs/TextInputPatternFormat";
import { formClassNames } from "./classNames";
import { useFormikFieldProps } from "./useFormikFieldProps";

/**
 * TextInput which uses `react-number-format` for phone formatting.
 *
 * > Currently only the US phone format is supported.
 */
export const PhoneInput = ({
  id,
  placeholder: explicitPlaceholder = "(123) 456-7890",
  variant: explicitVariant,
  ...props
}: PhoneInputProps) => {
  const [{ value: fieldValue, ...textInputProps }] = useFormikFieldProps({
    id,
    placeholder: explicitPlaceholder,
    variant: explicitVariant,
  });

  return (
    <PatternFormatTextInput
      // TextField props:
      value={fieldValue ?? ""}
      type="tel"
      autoComplete="tel"
      className={formClassNames.phoneInput}
      {...textInputProps}
      {...props}
      // PatternFormat props:
      customInput={StyledTextField}
      format="(###) ###-####"
    />
  );
};

export type PhoneInputProps = Omit<
  PatternFormatTextInputProps,
  "type" | "autoComplete" | "customInput" | "format" | "valueIsNumericString"
> & {
  id: string;
};
