import MuiSelect, { type SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { useField, useFormikContext } from "formik";

export const Select = ({
  id,
  label,
  options,
  variant,
  fullWidth = false,
  styles = {},
  ...props
}: {
  id: string;
  label?: React.ReactNode;
  options: SelectOptions;
  styles?: {
    container?: React.CSSProperties;
    label?: React.CSSProperties;
    select?: React.CSSProperties;
  };
} & Omit<React.ComponentProps<typeof MuiSelect>, "style">) => {
  const [field, meta] = useField(id);
  const { setFieldValue, handleBlur } = useFormikContext();
  const { palette } = useTheme();

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFieldValue(id, event.target.value as string);
  };

  const selectLabelID = `Select:InputLabel:${id}`;
  const muiVariant = variant ? variant : palette.mode === "dark" ? "filled" : "outlined";

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
        variant={variant}
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

export type SelectOptions = Array<{ value: string | number | null; label?: string }>;
