import { TextInput, type TextInputProps } from "./TextInput.jsx";
import type { Except } from "type-fest";

export type EmailInputProps = Except<TextInputProps, "type" | "autoComplete">;

export const EmailInput = ({ ...textInputProps }: EmailInputProps) => (
  <TextInput type="email" autoComplete="email" {...textInputProps} />
);
