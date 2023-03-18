import { useField, useFormikContext } from "formik";
import { grid as muiGridSxProps, type GridProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

export const DateTimePicker = ({
  id,
  label,
  style = {},
  renderInput = (params: TextFieldProps) => <TextField style={style} {...params} />,
  ...props
}: DateTimePickerProps) => {
  const [field] = useField(id);
  const { setFieldValue } = useFormikContext();

  const handleChange = (value: unknown, keyboardInputValue?: string | undefined) => {
    setFieldValue(id, value);
  };

  return (
    <StyledMuiDateTimePicker
      label={label}
      value={field.value}
      onChange={handleChange}
      renderInput={renderInput}
      {...props}
    />
  );
};

const StyledMuiDateTimePicker = styled(MuiDateTimePicker, {
  shouldForwardProp: (propName) => !(propName as string).startsWith("grid")
})<GridProps>(muiGridSxProps);

export type DateTimePickerProps = {
  id: string;
  style?: React.CSSProperties;
  renderInput?: (
    params: TextFieldProps
  ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
} & Omit<
  React.ComponentProps<typeof StyledMuiDateTimePicker>,
  "value" | "onChange" | "renderInput"
>;
