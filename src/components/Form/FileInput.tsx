import { useField, useFormikContext } from "formik";
import Button from "@mui/material/Button";

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
}: Omit<React.ComponentProps<typeof Button>, "label"> & {
  id: string;
  label: string;
}) => {
  const [field, meta] = useField(id);
  const { handleChange, handleBlur } = useFormikContext();

  return (
    <Button component="label" variant={variant}>
      {label ?? id.toUpperCase()}
      <input hidden accept="image/*" type="file" />
    </Button>
  );
};
