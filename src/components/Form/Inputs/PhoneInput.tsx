import { PatternFormat, type PatternFormatProps } from "react-number-format";
import { BaseTextField, type BaseTextFieldProps } from "./BaseTextField.jsx";
import { formClassNames } from "../classNames.js";
import {
  useFormikFieldProps,
  type FormikIntegratedInputProps,
} from "../helpers/useFormikFieldProps.js";

/**
 * TextInput which uses [react-number-format] for phone formatting.
 *
 * > Currently only the US phone format is supported.
 *
 * [rnf-docs]: https://s-yadav.github.io/react-number-format/docs/pattern_format
 */
export const PhoneInput = <ValueType extends string | null | undefined = string>({
  id,
  placeholder: explicitPlaceholder = "(123) 456-7890",
  variant: explicitVariant,
  ...props
}: PhoneInputProps) => {
  const [{ value: fieldValue, ...textInputProps }] = useFormikFieldProps<ValueType>({
    fieldID: id,
    placeholder: explicitPlaceholder,
    variant: explicitVariant,
  });

  return (
    <PatternFormat<BaseTextFieldProps>
      // TextField props:
      value={fieldValue ?? ""}
      type="tel"
      autoComplete="tel"
      className={formClassNames.phoneInput}
      {...textInputProps}
      {...props}
      // PatternFormat props:
      customInput={BaseTextField}
      format="(###) ### - ####"
    />
  );
};

export type PhoneInputProps = FormikIntegratedInputProps<
  Omit<
    PatternFormatProps<BaseTextFieldProps>,
    "type" | "autoComplete" | "customInput" | "format" | "valueIsNumericString"
  >
>;
