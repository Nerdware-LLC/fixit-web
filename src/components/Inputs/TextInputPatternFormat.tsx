import { PatternFormat, type PatternFormatProps } from "react-number-format";
import type { StyledTextFieldProps } from "./StyledTextField";

/**
 * TextInput which uses `react-number-format` for pattern-based formatting.
 *
 * Docs: https://s-yadav.github.io/react-number-format/docs/pattern_format
 */
export const PatternFormatTextInput = PatternFormat<StyledTextFieldProps>;

/**
 * Prop types for `PatternFormatTextInput`
 */
export type PatternFormatTextInputProps = PatternFormatProps<StyledTextFieldProps>;
