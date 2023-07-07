import InputAdornment from "@mui/material/InputAdornment";
import Text from "@mui/material/Typography";
import { StyledTextField } from "@components/Inputs/StyledTextField";
import {
  NumericFormatTextInput,
  type NumericFormatTextInputProps,
} from "@components/Inputs/TextInputNumericFormat";
import { formClassNames } from "./classNames";
import { useFormikFieldProps } from "./useFormikFieldProps";

/**
 * TextInput which uses `react-number-format` for currency formatting.
 *
 * **NOTE:** Setting prop `type="number"` is not recommended, since the resultant
 * HTML element is prone to being unintentionally changed via mouse scroll wheel.
 * See https://mui.com/material-ui/react-text-field/#type-quot-number-quot
 */
export const CurrencyInput = ({
  id,
  placeholder: explicitPlaceholder = "0.00",
  variant: explicitVariant,
  InputProps = {},
  ...props
}: CurrencyInputProps) => {
  const [{ value: fieldValue, ...textInputProps }] = useFormikFieldProps({
    id,
    placeholder: explicitPlaceholder,
    variant: explicitVariant,
  });

  return (
    <NumericFormatTextInput
      // TextField props:
      value={fieldValue ?? ""}
      className={formClassNames.currencyInput}
      InputProps={{
        ...InputProps,
        inputMode: "numeric", // see jsdoc for why this isn't "number"
        startAdornment: (
          <InputAdornment position="start">
            <Text>$</Text>
          </InputAdornment>
        ),
        sx: {
          "& input": { textAlign: "right" },
          ...(InputProps?.sx ?? {}),
        },
      }}
      {...textInputProps}
      {...props}
      // NumericFormat props:
      customInput={StyledTextField}
      allowLeadingZeros={false}
      allowNegative={false}
      decimalScale={2}
      fixedDecimalScale
      thousandSeparator
      valueIsNumericString
    />
  );
};

export type CurrencyInputProps = Omit<
  NumericFormatTextInputProps,
  | "type"
  | "autoComplete"
  | "customInput"
  | "allowLeadingZeros"
  | "allowNegative"
  | "decimalScale"
  | "fixedDecimalScale"
  | "thousandSeparator"
  | "valueIsNumericString"
> & {
  id: string;
  autoComplete?: "transaction-amount";
  InputProps?: Omit<NumericFormatTextInputProps["InputProps"], "inputMode">;
};
