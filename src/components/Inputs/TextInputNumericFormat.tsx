import { NumericFormat, type NumericFormatProps } from "react-number-format";
import type { StyledTextFieldProps } from "./StyledTextField";

/**
 * TextInput which uses `react-number-format` for numeric formatting.
 *
 * Docs: https://s-yadav.github.io/react-number-format/docs/numeric_format
 */
export const NumericFormatTextInput = NumericFormat<StyledTextFieldProps>;

/**
 * Prop types for `NumericFormatTextInput`
 */
export type NumericFormatTextInputProps = NumericFormatProps<StyledTextFieldProps>;
