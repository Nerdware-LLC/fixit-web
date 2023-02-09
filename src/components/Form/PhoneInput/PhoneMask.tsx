import React from "react";
import { IMaskInput } from "react-imask";
import { REGIONAL_PHONE_FORMATS } from "./regionalPhoneFormats";
import type { TextInputProps, MuiTextFieldProps } from "../TextInput";

// prettier-ignore
export const PhoneMask = React.forwardRef<PhoneMaskRef, PhoneMaskProps>(
  function PhoneInput({ onChange, id, ...inputProps }, ref) {
    return (
      <IMaskInput
        mask={REGIONAL_PHONE_FORMATS.USA.maskFormat}
        inputRef={ref as any}
        unmask={true}
        onAccept={(value: any) => onChange({ target: { name: id, value } } as any)}
        {...inputProps}
      />
    );
  }
);

type PhoneMaskRef = React.Ref<React.ReactElement> | undefined;
type PhoneMaskProps = TextInputProps & { onChange: Pick<MuiTextFieldProps, "onChange"> };
