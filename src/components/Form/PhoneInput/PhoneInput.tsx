import { PhoneMask } from "./PhoneMask";
import { REGIONAL_PHONE_FORMATS } from "./regionalPhoneFormats";
import { TextInput, type TextInputProps } from "../TextInput";

/**
 * Phone input with mask, content-type, and placeholder.
 *
 * > Currently only `"USA"` regional phone format is supported.
 */
export const PhoneInput = ({
  placeholder = REGIONAL_PHONE_FORMATS.USA.placeholder,
  ...props
}: Omit<TextInputProps, "contentType">) => (
  <TextInput
    {...props}
    contentType="phone"
    placeholder={placeholder}
    InputProps={{
      inputComponent: PhoneMask as any
    }}
  />
);
