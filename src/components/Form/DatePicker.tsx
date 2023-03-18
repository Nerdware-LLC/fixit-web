import { useField, useFormikContext } from "formik";
import { grid as muiGridSxProps, type GridProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

export const DatePicker = ({
  id,
  label,
  style = {},
  renderInput = (params: TextFieldProps) => <TextField style={style} {...params} />,
  ...props
}: DatePickerProps) => {
  const [field] = useField(id);
  const { setFieldValue } = useFormikContext();

  const handleChange = (value: unknown, keyboardInputValue?: string | undefined) => {
    setFieldValue(id, value);
  };

  return (
    <StyledMuiDatePicker
      label={label}
      value={field.value}
      onChange={handleChange}
      renderInput={renderInput}
      {...props}
    />
  );
};

const StyledMuiDatePicker = styled(MuiDatePicker, {
  shouldForwardProp: (propName) => !(propName as string).startsWith("grid")
})<GridProps>(muiGridSxProps);

export type DatePickerProps = {
  id: string;
  style?: React.CSSProperties;
  renderInput?: (
    params: TextFieldProps
  ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
} & Omit<React.ComponentProps<typeof StyledMuiDatePicker>, "value" | "onChange" | "renderInput">;
