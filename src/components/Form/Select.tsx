import { useField, useFormikContext } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";
import { useDefaultTextFieldVariant } from "./useDefaultTextFieldVariant";
import type { SelectProps as MuiSelectProps, SelectChangeEvent } from "@mui/material/Select";

export const Select = ({
  id,
  label,
  options,
  variant: explicitVariant,
  fullWidth = false,
  styles = {},
  ...props
}: SelectProps) => {
  const [field, meta] = useField(id);
  const { setFieldValue, handleBlur } = useFormikContext();
  const defaultVariant = useDefaultTextFieldVariant();

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFieldValue(id, event.target.value as string);
  };

  const selectLabelID = `Select:InputLabel:${id}`;

  const muiVariant = explicitVariant ?? defaultVariant;

  return (
    <FormControl
      variant={muiVariant}
      fullWidth={fullWidth}
      error={!!(meta.touched && meta.error)}
      style={styles?.container ?? {}}
    >
      <InputLabel id={selectLabelID} style={styles?.label ?? {}}>
        {label ?? id}
      </InputLabel>
      <MuiSelect
        labelId={selectLabelID}
        id={id}
        variant={muiVariant}
        value={field.value ?? ""}
        onChange={handleChangeSelect}
        onBlur={handleBlur(id)}
        error={!!(meta.touched && meta.error)}
        style={styles?.select ?? {}}
        {...props}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={`Select:opt-${value ?? "NULL"}`} value={value ?? ""}>
            {label ?? value}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export type SelectProps = {
  id: string;
  label?: React.ReactNode;
  options: SelectOptions;
  styles?: {
    container?: React.CSSProperties;
    label?: React.CSSProperties;
    select?: React.CSSProperties;
  };
} & Omit<MuiSelectProps, "style">;

export type SelectOptions = Array<{ value: string | number | null; label?: string }>;
