import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextInput, type TextInputProps } from "./TextInput";
import { formClassNames } from "./classNames";

export const PasswordInput = ({ InputProps = {}, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVis = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <TextInput
      type={showPassword ? "text" : "password"}
      className={formClassNames.passwordInput}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onMouseDown={toggleVis} edge="end">
              {showPassword ? (
                <Visibility style={{ opacity: "0.75" }} />
              ) : (
                <VisibilityOff style={{ opacity: "0.5" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

/**
 * Prop types for `PasswordInput`
 * - Base type: `TextInputProps`
 * - `autoComplete` is restricted to only the values that are valid for password inputs
 * - `type` and `InputProps["endAdornment"]` are removed since they're handled internally
 */
export type PasswordInputProps = Omit<TextInputProps, "autoComplete" | "type" | "InputProps"> & {
  autoComplete?: "current-password" | "new-password";
  InputProps?: Omit<TextInputProps["InputProps"], "endAdornment">;
};
