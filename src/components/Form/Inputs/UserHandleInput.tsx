import { useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { BaseTextField } from "./BaseTextField.jsx";
import { formClassNames } from "../classNames.js";
import { useFormikFieldProps } from "../helpers";
import type { TextInputProps } from "./TextInput.jsx";

export type UserHandleInputProps = TextInputProps;

export const UserHandleInput = <ValueType extends string | null | undefined = string>({
  id,
  label: explicitLabel,
  variant: explicitVariant,
  placeholder = "my_username",
  ...userHandleInputProps
}: UserHandleInputProps) => {
  const [{ value, ...textInputProps }, { setValue }] = useFormikFieldProps<ValueType>({
    fieldID: id,
    label: explicitLabel,
    variant: explicitVariant,
    placeholder,
  });

  // EFFECT: Remove @ and any whitespace from the user handle `value` to simplify user input
  useEffect(() => {
    (async () => {
      // If `value` is falsey, do nothing
      if (!value) return;

      const formattedValue = value.replace(/(@|\s)/g, "");

      if (value !== formattedValue) await setValue(formattedValue as ValueType);
    })();
  }, [value, setValue]);

  return (
    <BaseTextField
      value={value ?? ""}
      className={formClassNames.textInput}
      {...textInputProps}
      {...userHandleInputProps}
      InputProps={{
        ...(userHandleInputProps.InputProps ?? {}),
        startAdornment: <InputAdornment position="start">@</InputAdornment>,
      }}
    />
  );
};
