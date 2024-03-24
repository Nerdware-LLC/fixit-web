import InputAdornment from "@mui/material/InputAdornment";
import { TextInput, type TextInputProps } from "./TextInput";

export const UserHandleInput = ({ ...userHandleInputProps }: UserHandleInputProps) => (
  <TextInput
    {...userHandleInputProps}
    InputProps={{
      ...(userHandleInputProps.InputProps ?? {}),
      startAdornment: <InputAdornment position="start">@</InputAdornment>,
    }}
  />
);

export type UserHandleInputProps = TextInputProps;
