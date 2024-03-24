import { TextInput, type TextInputProps } from "./TextInput";
import type { Except } from "type-fest";

export const EmailInput = ({ ...textInputProps }: EmailInputProps) => (
  <TextInput type="email" autoComplete="email" {...textInputProps} />
);

export type EmailInputProps = Except<TextInputProps, "type" | "autoComplete">;
