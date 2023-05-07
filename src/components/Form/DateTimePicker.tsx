import {
  StyledDateTimePicker,
  type StyledDateTimePickerProps,
} from "@components/Inputs/StyledDateTimePicker";
import { formClassNames } from "./classNames";
import { useFormikFieldProps } from "./useFormikFieldProps";
import type { TextFieldProps } from "@mui/material/TextField";

export const DateTimePicker = <TDate extends Date | string | number | null = Date>({
  id,
  variant: explicitVariant,
  style,
  slotProps = {},
  ...props
}: DateTimePickerProps<TDate>) => {
  const [{ value: fieldValue, onChange: handleFieldValueChange, variant }] =
    useFormikFieldProps<TDate>({
      id,
      variant: explicitVariant,
    });

  const handleChange = (value: TDate | null) => {
    handleFieldValueChange(value);
  };

  return (
    <StyledDateTimePicker<TDate>
      value={fieldValue}
      onChange={handleChange}
      className={formClassNames.dateTimeInput}
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

export type DateTimePickerProps<TDate extends Date | string | number | null> = {
  id: string;
  variant?: TextFieldProps["variant"];
  style?: React.CSSProperties;
} & Omit<StyledDateTimePickerProps<TDate>, "value" | "onChange">;
