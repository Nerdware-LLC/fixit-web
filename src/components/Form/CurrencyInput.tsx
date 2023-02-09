import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Text from "@mui/material/Typography";
import { useField, useFormikContext } from "formik";

/**
 * - Why not set the `type` prop to "number"? While it does create an input
 *   which only accepts numbers, the resultant HTML element is also prone to
 *   being unintentionally changed via the mouse scroll wheel.
 *
 *   https://mui.com/material-ui/react-text-field/#type-quot-number-quot
 */
export const CurrencyInput = ({
  id,
  label,
  placeholder,
  variant = "filled",
  style,
  InputProps = {},
  FormHelperTextProps = {},
  ...props
}: Omit<React.ComponentProps<typeof TextField>, "label"> & {
  id: string;
  label?: React.ReactNode;
}) => {
  const [field, meta] = useField(id);
  const { setFieldValue, setFieldTouched, setFieldError, handleBlur } = useFormikContext();

  const formikBlurHandler = handleBlur(id);

  const handleInputChange = (event: React.ChangeEvent<any> | any) => {
    setFieldTouched(id, true, false);

    const { value } = event.currentTarget;

    if (/^\d+(\.\d{0,2})?$/.test(value)) {
      setFieldValue(id, value, false);
    } else {
      setFieldError(id, "Please enter a valid currency value");
    }
  };

  return (
    <TextField
      id={id}
      label={label ?? id.toUpperCase()}
      variant={variant}
      placeholder={!(meta.touched && meta.error) ? "0.00" : undefined}
      value={field.value ?? ""}
      onChange={handleInputChange}
      onBlur={formikBlurHandler}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && !!meta?.error ? meta.error : " "}
      style={style}
      InputProps={{
        inputMode: "numeric",
        startAdornment: (
          <InputAdornment position="start">
            <Text>$</Text>
          </InputAdornment>
        ),
        sx: {
          "& input": {
            textAlign: "right"
          }
        },
        ...InputProps
      }}
      FormHelperTextProps={{
        style: { whiteSpace: "nowrap" },
        ...FormHelperTextProps
      }}
      {...props}
    />
  );
};
