import { useField, useFormikContext } from "formik";
import Button, { type ButtonProps } from "@mui/material/Button";

/**
 * // FIXME FileInput not yet implemented
 */
export const FileInput = ({
  id,
  label,
  placeholder,
  variant = "contained",
  style,
  ...props
}: FileInputProps) => {
  const [field, meta] = useField(id);
  const { handleChange, handleBlur } = useFormikContext();

  return (
    <Button component="label" variant={variant}>
      {label ?? id.toUpperCase()}
      <input hidden accept="image/*" type="file" />
    </Button>
  );
};

export type FileInputProps = {
  id: string;
  label: string;
} & Omit<ButtonProps, "label">;
