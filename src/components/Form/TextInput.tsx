import React from "react";
import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";
import { INPUT_CONTENT_TYPES_DICT } from "./inputContentTypesDict";
import { string, oneOf, styleType } from "../../types";

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
  contentType?: keyof typeof INPUT_CONTENT_TYPES_DICT;
}) => {
  const [field, meta] = useField(id);
  const { handleChange, handleBlur } = useFormikContext();

  const placeholderText = !!placeholder
    ? placeholder
    : !!label && typeof label === "string"
    ? label
    : id.toUpperCase();

  // ContentType: try explicit "contentType" prop, else check if "id" matches a key.
  const contentTypeProps =
    (contentType ?? id) in INPUT_CONTENT_TYPES_DICT
      ? INPUT_CONTENT_TYPES_DICT[contentType ?? (id as keyof typeof INPUT_CONTENT_TYPES_DICT)]
      : {};

  return (
    <TextField
      id={id}
      label={label ?? id.toUpperCase()}
      variant={variant}
      placeholder={!(meta.touched && meta.error) ? placeholderText : undefined}
      value={field.value ?? ""}
      onChange={handleChange(id)}
      onBlur={handleBlur(id)}
      helperText={meta.touched && !!meta?.error ? meta.error : " "}
      style={style}
      {...contentTypeProps}
      {...props}
    />
  );
};

TextInput.propTypes = {
  id: string.isRequired,
  label: string,
  placeholder: string,
  contentType: oneOf([
    "address",
    "name",
    "givenName",
    "familyName",
    "businessName",
    "email",
    "phone",
    "password"
  ]),
  style: styleType
};
