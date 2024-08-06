import { PatternFormat, type PatternFormatProps } from "react-number-format";
import { BaseTextField, type BaseTextFieldProps } from "./BaseTextField.jsx";
import { formClassNames } from "../classNames.js";
import {
  useFormikFieldProps,
  type FormikIntegratedInputProps,
} from "../helpers/useFormikFieldProps.js";
import type { OverrideProperties } from "type-fest";
import type { TelAutoCompleteValue } from "./types.js";

export type PhoneInputProps = FormikIntegratedInputProps<
  OverrideProperties<
    Omit<PatternFormatProps<BaseTextFieldProps>, "type" | "customInput">,
    {
      autoComplete?: TelAutoCompleteValue;
      format?: string;
    }
  >
>;

/**
 * TextInput which uses [react-number-format] for phone formatting.
 *
 * [rnf-docs]: https://s-yadav.github.io/react-number-format/docs/pattern_format
 */
export const PhoneInput = <ValueType extends string | null | undefined = string>({
  fieldID,
  format = "(###) ### - ####",
  placeholder: explicitPlaceholder = "(123) 456-7890",
  variant: explicitVariant,
  autoComplete = "tel-national",
  ...props
}: PhoneInputProps) => {
  const [{ value: fieldValue, ...textInputProps }] = useFormikFieldProps<ValueType>({
    fieldID,
    placeholder: explicitPlaceholder,
    variant: explicitVariant,
  });

  return (
    <PatternFormat<BaseTextFieldProps>
      // TextField props:
      value={fieldValue ?? ""}
      type="tel"
      autoComplete={autoComplete}
      className={formClassNames.phoneInput}
      {...textInputProps}
      {...props}
      // PatternFormat props:
      customInput={BaseTextField}
      format={format}
    />
  );
};
