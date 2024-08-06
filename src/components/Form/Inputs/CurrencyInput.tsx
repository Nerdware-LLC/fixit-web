import { NumericFormat, type NumericFormatProps } from "react-number-format";
import InputAdornment from "@mui/material/InputAdornment";
import Text from "@mui/material/Typography";
import { BaseTextField, type BaseTextFieldProps } from "./BaseTextField.jsx";
import { formClassNames } from "../classNames.js";
import { useFormikFieldProps, type FormikIntegratedInputProps } from "../helpers";
import type { Simplify } from "type-fest";

export type CurrencyInputProps = Simplify<
  FormikIntegratedInputProps<
    Omit<
      NumericFormatProps<BaseTextFieldProps>,
      | "allowLeadingZeros"
      | "allowNegative"
      | "autoComplete"
      | "customInput"
      | "decimalScale"
      | "fixedDecimalScale"
      | "thousandSeparator"
      | "type"
      | "valueIsNumericString"
    > & {
      autoComplete?: "transaction-amount";
      InputProps?: Omit<BaseTextFieldProps["InputProps"], "inputMode">;
    }
  >
>;

/**
 * TextInput which uses [react-number-format][rnf-docs] for currency formatting.
 *
 * #### Usage Notes
 * - [Mui's TextField docs strongly recommend using `type="numeric"` over `type="number"` for
 *   numeric inputs][mui-type-prop], since the latter results in an HTML element that's prone
 *   to being unintentionally changed via mouse scroll-wheel.
 *
 * [rnf-docs]: https://s-yadav.github.io/react-number-format/docs/numeric_format
 * [mui-type-prop]: https://mui.com/material-ui/react-text-field/#type-quot-number-quot
 */
export const CurrencyInput = <ValueType extends string | number | null | undefined = string>({
  fieldID,
  placeholder: explicitPlaceholder = "0.00",
  variant: explicitVariant,
  InputProps = {},
  ...props
}: CurrencyInputProps) => {
  const [{ value: fieldValue, ...textInputProps }] = useFormikFieldProps<ValueType>({
    fieldID,
    placeholder: explicitPlaceholder,
    variant: explicitVariant,
  });

  return (
    <NumericFormat<BaseTextFieldProps>
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
          ...(InputProps.sx ?? {}),
        },
      }}
      {...textInputProps}
      {...props}
      // NumericFormat props:
      customInput={BaseTextField}
      allowLeadingZeros={false}
      allowNegative={false}
      decimalScale={2}
      fixedDecimalScale
      thousandSeparator
      valueIsNumericString
    />
  );
};
