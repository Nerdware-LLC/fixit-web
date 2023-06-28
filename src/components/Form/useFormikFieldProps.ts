import { useField, type FieldInputProps, type FieldMetaProps, type FieldHelperProps } from "formik";
import { useDefaultTextFieldVariant } from "./useDefaultTextFieldVariant";
import type { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

/**
 * Defines shared logical behavior for Mui inputs and related/derived components.
 *
 * @template ValueType - The type of the value being managed by the input.
 *
 * @param {boolean=} [shouldAlwaysRenderHelperText=true] - A bool switch which when `true`
 *        will cause Mui HelperText to always be rendered, even when empty/undefined. This
 *        is useful when the Mui input is used in a layout where the conditional rendering
 *        of the HelperText would cause layout changes when the input is in an error state.
 *
 * @returns A tuple containing two objects:
 *   - `index[0]`: MuiTextFieldProps, this object can be provided as-is to most Mui inputs.
 *   - `index[1]`: Contains all original values provided by the Formik `useField` hook.
 */
export const useFormikFieldProps = <ValueType = any>({
  id,
  label: explicitLabel,
  variant: explicitVariant,
  placeholder,
  shouldAlwaysRenderHelperText = true,
}: UseFormikFieldPropsParams): UseFormikFieldPropsReturn<ValueType> => {
  const [fieldInputProps, fieldMetaProps, fieldHelperProps] = useField<ValueType>(id);

  const { value: fieldValue, onChange, onBlur } = fieldInputProps;

  const defaultVariant = useDefaultTextFieldVariant();

  const label = explicitLabel ?? id;
  const showErrorState = fieldMetaProps.touched && !!fieldMetaProps?.error;

  return [
    // Props for Mui TextField and other inputs:
    {
      id,
      label,
      ...(!showErrorState && placeholder && { placeholder }),
      variant: explicitVariant ?? defaultVariant,
      value: fieldValue,
      onChange,
      onBlur,
      error: showErrorState,
      helperText: showErrorState
        ? `${fieldMetaProps.error}`
        : shouldAlwaysRenderHelperText
        ? " "
        : "",
    },
    // Original Formik useField values:
    {
      ...fieldInputProps,
      ...fieldMetaProps,
      ...fieldHelperProps,
    },
  ];
};

export type UseFormikFieldPropsParams = {
  id: string;
  label?: string;
  variant?: MuiTextFieldProps["variant"];
  placeholder?: string;
  shouldAlwaysRenderHelperText?: boolean;
};

export type UseFormikFieldPropsReturn<ValueType = any> = [
  {
    id: string;
    label: string;
    placeholder?: string;
    variant: MuiTextFieldProps["variant"];
    value: ValueType;
    onChange: FieldInputProps<ValueType>["onChange"];
    onBlur: FieldInputProps<ValueType>["onBlur"];
    error: boolean;
    helperText: string;
  },
  FieldInputProps<ValueType> & FieldMetaProps<ValueType> & FieldHelperProps<ValueType>
];
