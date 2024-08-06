import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";
import {
  useFormikFieldProps,
  getFormInputErrMsg,
  type FormikIntegratedInputProps,
} from "../helpers";
import type { SelectProps as MuiSelectProps } from "@mui/material/Select";

export type SelectProps<
  ValueType extends string | number | null | undefined = string | number | null,
> = FormikIntegratedInputProps<
  {
    label?: React.ReactNode;
    options: SelectOptions<ValueType>;
    sx?: FormControlProps["sx"];
    FormControlProps?: Omit<FormControlProps, "children">;
  } & Omit<MuiSelectProps, "children">
>;

export type SelectOptions<
  ValueType extends string | number | null | undefined = string | number | null,
> = Array<{
  value: ValueType;
  label?: string;
}>;

/**
 * MUI Select with Formik integration.
 *
 * - If an `id` attribute/prop is not provided, one will be generated from the
 *   `fieldID` prop by removing all non-alphanumeric characters.
 *
 * - The Mui `sx` prop is passed to the containiner — a Mui FormControl.
 */
export const Select = <
  ValueType extends string | number | null | undefined = string | number | null,
>({
  fieldID,
  id: selectElementID,
  options,
  label,
  variant: explicitVariant,
  fullWidth = false,
  sx,
  FormControlProps = {},
  ...muiSelectProps
}: SelectProps<ValueType>) => {
  const [
    { value: fieldValue, variant, error: showErrorState, helperText },
    { setValue, setError },
  ] = useFormikFieldProps<ValueType>({
    fieldID,
    variant: explicitVariant,
  });

  const handleChange: SelectProps["onChange"] = async (event) => {
    await setValue(event.target.value as ValueType).catch((error: unknown) =>
      setError(getFormInputErrMsg(error))
    );
  };

  selectElementID ||= fieldID.replace(/[^a-zA-Z0-9_-]/, "");

  const labelID = `Select:InputLabel:${selectElementID}`;

  return (
    <FormControl
      variant={variant}
      fullWidth={fullWidth}
      error={showErrorState}
      sx={sx}
      {...FormControlProps}
    >
      <InputLabel id={labelID}>{label ?? fieldID}</InputLabel>
      <MuiSelect
        labelId={labelID}
        value={fieldValue ?? ""}
        onChange={handleChange}
        error={showErrorState}
        {...muiSelectProps}
      >
        {options.map(({ value, label }, index) => (
          <MenuItem key={`Select:${value ?? index}`} value={value ?? ""}>
            {label ?? value}
          </MenuItem>
        ))}
      </MuiSelect>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
