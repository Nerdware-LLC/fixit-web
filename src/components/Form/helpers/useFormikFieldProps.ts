import { useField, type FieldInputProps, type FieldMetaProps, type FieldHelperProps } from "formik";
import { getFormInputErrMsg } from "./errorHandling.js";
import { useLayoutDependantTextFieldDefaults } from "./useLayoutDependantTextFieldDefaults.js";
import type { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import type { Simplify, SetReturnType } from "type-fest";

/**
 * Defines shared logical behavior for [Formik](https://formik.org)-integrated input components.
 *
 * @template ValueType - The type of the value being managed by the input.
 *
 * @param shouldAlwaysRenderHelperText A bool switch which when `true` will cause Mui
 *   HelperText to always be rendered, even when empty/undefined. This is useful when
 *   the Mui input is used in a layout where the conditional rendering of the HelperText
 *   would cause layout changes when the input is in an error state.
 *
 * @returns A tuple containing two objects:
 *   - `index[0]`: MuiTextFieldProps, this object can be provided as-is to most Mui inputs.
 *   - `index[1]`: Contains all original values provided by the Formik `useField` hook.
 */
export const useFormikFieldProps = <ValueType>({
  fieldID,
  label: explicitLabel,
  variant: explicitVariant,
  size: explicitSize,
  placeholder,
  shouldAlwaysRenderHelperText = true,
}: UseFormikFieldPropsParams): UseFormikFieldPropsReturn<ValueType> => {
  const [fieldInputProps, fieldMetaProps, fieldHelperProps] = useField<ValueType>(fieldID);

  const { value: fieldValue, onChange, onBlur } = fieldInputProps;

  const { defaultVariant, defaultSize, isMobilePageLayout, isMobileUserAgent } =
    useLayoutDependantTextFieldDefaults();

  const label = explicitLabel ?? fieldID;
  const showErrorState = fieldMetaProps.touched && !!fieldMetaProps.error;

  return [
    // Props for Mui TextField and other inputs:
    {
      id: fieldID,
      label,
      ...(!showErrorState && placeholder && { placeholder }),
      variant: explicitVariant ?? defaultVariant,
      size: explicitSize ?? defaultSize,
      value: fieldValue,
      onChange,
      onBlur,
      error: showErrorState,
      helperText: showErrorState
        ? getFormInputErrMsg(fieldMetaProps.error)
        : shouldAlwaysRenderHelperText
          ? " "
          : "",
    },
    // Original values returned from the useField and useDefaultTextFieldVariant hooks:
    {
      ...fieldInputProps,
      ...fieldMetaProps,
      ...fieldHelperProps,
      isMobilePageLayout,
      isMobileUserAgent,
      defaultVariant,
      defaultSize,
    },
  ];
};

/**
 * Parameters of the {@link useFormikFieldProps|`useFormikFieldProps`} hook.
 */
export type UseFormikFieldPropsParams = {
  /**
   * The Formik field ID the input will provide to [Formik's `useField`][useField-ref] hook.
   *
   * [useField-ref]: https://formik.org/docs/api/useField#reference
   */
  fieldID: string;
  label?: string;
  variant?: MuiTextFieldProps["variant"];
  size?: MuiTextFieldProps["size"];
  placeholder?: string;
  shouldAlwaysRenderHelperText?: boolean;
};

/**
 * Return type of the {@link useFormikFieldProps|`useFormikFieldProps`} hook.
 */
export type UseFormikFieldPropsReturn<ValueType> = [
  {
    id: string;
    label: string;
    placeholder?: string;
    variant: MuiTextFieldProps["variant"];
    size: MuiTextFieldProps["size"];
    value: ValueType;
    onChange: FieldInputProps<ValueType>["onChange"];
    onBlur: FieldInputProps<ValueType>["onBlur"];
    error: boolean;
    helperText: string;
  },
  FieldInputProps<ValueType> &
    FieldMetaProps<ValueType> &
    FieldHelperProps<ValueType> &
    ReturnType<typeof useLayoutDependantTextFieldDefaults>,
];

/**
 * This generic augments base prop typings for Formik-integrated input components
 * by making the following modifications:
 *
 * - Requires prop `id: string`, the value for which is used as the field ID for the
 *   Formik [`useField`][usefield-docs] hook.
 *
 * - Omits prop `value`, which Formik-integrated inputs obtain from [`useField`][usefield-docs].
 *
 * - A union of event-handler prop names can be provided as the 2nd type parameter to
 *   _asyncify_ their return types, i.e. `() => Foo` becomes `() => Foo | Promise<Foo>`.
 *
 * [usefield-docs]: https://formik.org/docs/api/useField
 * [promisable-docs]: https://github.com/sindresorhus/type-fest/blob/main/source/promisable.d.ts
 */
export type FormikIntegratedInputProps<
  BaseProps extends object,
  FnPropsToAsyncify extends string = never,
> = Simplify<
  {
    /** The field ID to provide to the `useField` Formik hook. */
    id: string;
  } & {
    [Key in keyof BaseProps as Key extends PropsToOmit ? never : Key]: Key extends FnPropsToAsyncify
      ? AddAsyncReturnType<BaseProps[Key]>
      : BaseProps[Key];
  }
>;

type PropsToOmit =
  | "value" //            Formik-integrated inputs obtain this from `useField`
  | "components" //       Deprecated Mui prop, use `slots` instead
  | "componentsProps"; // Deprecated Mui prop, use `slotProps` instead

/** If `T` is a function, this generic will convert its return type from `X` to `X | Promise<X>`. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AddAsyncReturnType<T> = T extends (...args: any[]) => any
  ? SetReturnType<T, ReturnType<T> | Promise<Awaited<ReturnType<T>>>>
  : T;
