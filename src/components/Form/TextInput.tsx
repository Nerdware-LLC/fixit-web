import { useField, useFormikContext } from "formik";
import { grid as muiGridSxProps, type GridProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const TextInput = ({
  id,
  label,
  placeholder,
  contentType,
  variant = "filled",
  style,
  ...props
}: TextInputProps) => {
  const [field, meta] = useField(id);
  const { handleChange, handleBlur } = useFormikContext();

  const formikChangeHandler = handleChange(id);
  const formikBlurHandler = handleBlur(id);

  const placeholderText = placeholder
    ? placeholder
    : !!label && typeof label === "string"
    ? label
    : id.toUpperCase();

  // CONTENT TYPE PROPS: try explicit "contentType" prop, else check if "id" matches a key
  const contentTypeProps =
    CONTENT_TYPE_PROPS?.[contentType ?? (id as keyof typeof CONTENT_TYPE_PROPS)] ?? {};

  return (
    <StyledTextField
      id={id}
      label={label ?? id.toUpperCase()}
      variant={variant}
      type={contentType ?? "text"}
      value={field.value ?? ""}
      onChange={formikChangeHandler}
      onBlur={formikBlurHandler}
      placeholder={!(meta.touched && meta.error) ? placeholderText : undefined}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && !!meta?.error ? meta.error : " "}
      style={style}
      FormHelperTextProps={{
        style: { whiteSpace: "nowrap" }
      }}
      {...contentTypeProps}
      {...props}
    />
  );
};

const CONTENT_TYPE_PROPS = {
  name: {
    autoComplete: "name"
  },
  password: {
    autoComplete: "password",
    type: "password"
  },
  address: {
    autoComplete: "street-address",
    type: "streetAddressLine1"
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
  }
};

const StyledTextField = styled(TextField, {
  shouldForwardProp: (propName) => !(propName as string).startsWith("grid")
})<GridProps>(muiGridSxProps);

export type TextInputProps = Omit<React.ComponentProps<typeof StyledTextField>, "label"> & {
  id: string;
  label?: React.ReactNode;
  contentType?: keyof typeof CONTENT_TYPE_PROPS;
};
