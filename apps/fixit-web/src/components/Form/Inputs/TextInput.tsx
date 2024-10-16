import { BaseTextField, type BaseTextFieldProps } from "./BaseTextField.jsx";
import { formClassNames } from "../classNames.js";
import { useFormikFieldProps, type FormikIntegratedInputProps } from "../helpers";
import type { Except } from "type-fest";
import type { AutoCompleteAttributeValue } from "./types.js";

/**
 * {@link TextInput} props
 *
 * > Per [Mui's recommendation][mui-docs], this component does not support `type="number"`.
 *
 * [mui-docs]: https://mui.com/material-ui/react-text-field/#type-quot-number-quot
 */
export type TextInputProps = FormikIntegratedInputProps<
  Except<
    BaseTextFieldProps,
    // These props are removed bc they're handled internally by TextInput's Formik integration:
    | "onChange"
    | "onBlur"
    // These props are overridden in the intersection below:
    | "label"
    | "autoComplete"
    | "type"
  > & {
    label?: string;
    autoComplete?: AutoCompleteAttributeValue;
    type?: Exclude<React.InputHTMLAttributes<unknown>["type"], "number">;
  }
>;

export const TextInput = <ValueType extends string | null | undefined = string>({
  fieldID,
  label: explicitLabel,
  placeholder: explicitPlaceholder,
  variant: explicitVariant,
  ...props
}: TextInputProps) => {
  const [{ value, ...textInputProps }] = useFormikFieldProps<ValueType>({
    fieldID,
    label: explicitLabel,
    placeholder: explicitPlaceholder,
    variant: explicitVariant,
  });

  return (
    <BaseTextField
      className={formClassNames.textInput}
      value={value ?? ""}
      {...textInputProps}
      {...props}
    />
  );
};
