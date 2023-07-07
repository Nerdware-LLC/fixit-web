import { StyledDatePicker, type StyledDatePickerProps } from "@components/Inputs/StyledDatePicker";
import { formClassNames } from "./classNames";
import { useFormikFieldProps } from "./useFormikFieldProps";
import type { TextFieldProps } from "@mui/material/TextField";

/**
 * Mui DatePicker with Formik bindings and app-specific additions:
 * - Mui-system grid props like `gridArea`
 * - `variant` and `style` props, if provided, are passed to the `TextField` slot
 *   (defaults to `"outlined"` on mobile and `"filled"` on desktop).
 *
 * Usage example:
 * ```
 * <DatePicker gridArea="top-left" {...otherProps} />
 * ```
 */
export const DatePicker = <TDate extends Date | string | number | null = Date>({
  id,
  variant: explicitVariant,
  style,
  slotProps = {},
  ...props
}: DatePickerProps<TDate>) => {
  const [{ value: fieldValue, onChange: handleFieldValueChange, variant }] =
    useFormikFieldProps<TDate>({
      id,
      variant: explicitVariant,
    });

  const handleChange = (value: TDate | null) => {
    handleFieldValueChange(value);
  };

  return (
    <StyledDatePicker<TDate>
      value={fieldValue}
      onChange={handleChange}
      className={formClassNames.dateInput}
      slotProps={{
        textField: {
          variant,
          style,
          ...(slotProps?.textField ?? {}),
        },
        ...slotProps,
      }}
      {...props}
    />
  );
};

export type DatePickerProps<TDate extends Date | string | number | null> = {
  id: string;
  variant?: TextFieldProps["variant"];
  style?: React.CSSProperties;
} & Omit<StyledDatePickerProps<TDate>, "value" | "onChange">;
