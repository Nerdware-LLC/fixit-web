import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextInput } from "./TextInput";

export const PasswordInput = (
  props: Omit<React.ComponentProps<typeof TextInput>, "InputProps">
) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVis = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <TextInput
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleVis}
              onMouseDown={toggleVis}
              edge="end"
            >
              {showPassword ? (
                <Visibility style={{ opacity: "0.75" }} />
              ) : (
                <VisibilityOff style={{ opacity: "0.5" }} />
              )}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
};
