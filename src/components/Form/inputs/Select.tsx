import FormControl, { type FormControlProps } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";
import { useFormikFieldProps, type FormikIntegratedInputProps } from "../helpers";
import type { SelectProps as MuiSelectProps } from "@mui/material/Select";

export const Select = <
  ValueType extends string | number | null | undefined = string | number | null,
>({
  id,
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
    fieldID: id,
    variant: explicitVariant,
  });

  const handleChange: SelectProps["onChange"] = async (event) => {
    await setValue(event.target.value as ValueType).catch((error) => setError(error));
  };

  const selectLabelID = `Select:InputLabel:${id}`;

  return (
    <FormControl
      variant={variant}
      fullWidth={fullWidth}
      error={showErrorState}
      sx={sx}
      {...FormControlProps}
    >
      <InputLabel id={selectLabelID}>{label ?? id}</InputLabel>
      <MuiSelect
        labelId={selectLabelID}
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
