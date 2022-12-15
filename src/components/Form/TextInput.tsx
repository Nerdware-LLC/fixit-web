import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";

export const TextInput = ({
  id,
  label,
  placeholder,
  contentType,
  variant = "filled",
  style,
  ...props
}: Omit<React.ComponentProps<typeof TextField>, "label"> & {
  id: string;
  label?: React.ReactNode;
  contentType?: keyof typeof CONTENT_TYPE_PROPS;
}) => {
  const [field, meta] = useField(id);
  const { handleChange, handleBlur } = useFormikContext();

  const placeholderText = placeholder
    ? placeholder
    : !!label && typeof label === "string"
    ? label
    : id.toUpperCase();

  // ContentType: try explicit "contentType" prop, else check if "id" matches a key.
  const contentTypeProps =
    (contentType ?? id) in CONTENT_TYPE_PROPS
      ? CONTENT_TYPE_PROPS[contentType ?? (id as keyof typeof CONTENT_TYPE_PROPS)]
      : {};

  return (
    <TextField
      id={id}
      label={label ?? id.toUpperCase()}
      variant={variant}
      type={contentType ?? "text"}
      placeholder={!(meta.touched && meta.error) ? placeholderText : undefined}
      value={field.value ?? ""}
      onChange={handleChange(id)}
      onBlur={handleBlur(id)}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && !!meta?.error ? meta.error : " "}
      style={style}
      {...contentTypeProps}
      {...props}
    />
  );
};

const CONTENT_TYPE_PROPS = {
  address: {
    autoComplete: "street-address",
    type: "streetAddressLine1"
  },
  name: {
    autoComplete: "name"
  },
  givenName: {
    autoComplete: "name",
    type: "givenName"
  },
  familyName: {
    autoComplete: "name",
    type: "familyName"
  },
  businessName: {
    type: "familyName"
  },
  email: {
    autoComplete: "email",
    type: "emailAddress"
  },
  phone: {
    autoComplete: "tel",
    type: "telephoneNumber"
  },
  password: {
    autoComplete: "password",
    type: "password"
  }
};
