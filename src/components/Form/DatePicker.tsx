import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";

export const DatePicker = ({
  id,
  label,
  useDateTime = false,
  style = {},
  renderInput = (params: TextFieldProps) => <TextField style={style} {...params} />,
  ...props
}: {
  id: string;
  useDateTime?: boolean;
  style?: React.CSSProperties;
  renderInput?: (
    params: TextFieldProps
  ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
} & Omit<
  React.ComponentProps<typeof MuiDateTimePicker & typeof MuiDatePicker>,
  "value" | "onChange" | "renderInput"
>) => {
  const [field] = useField(id);
  const { setFieldValue } = useFormikContext();

  const handleChange = (value: unknown, keyboardInputValue?: string | undefined) => {
    setFieldValue(id, value);
  };

  const _props = {
    label,
    value: field.value,
    onChange: handleChange,
    renderInput,
    ...props
  };

  return useDateTime ? <MuiDateTimePicker {...(_props as any)} /> : <MuiDatePicker {..._props} />;
};
