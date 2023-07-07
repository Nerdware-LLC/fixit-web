import { grid as muiGridSxProps, type GridProps as MuiGridSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import {
  DatePicker as MuiDatePicker,
  type DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers/DatePicker";

/**
 * Mui DatePicker with Mui-system grid props like `gridArea`.
 *
 * Usage example:
 * ```
 * <StyledDatePicker gridArea="top-left" {...otherProps} />
 * ```
 */
export const StyledDatePicker = styled(MuiDatePicker, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<MuiGridSxProps>(muiGridSxProps) as <TDate extends Date | string | number | null = Date>(
  props: StyledDatePickerProps<TDate>
) => React.ReactElement;

export type StyledDatePickerProps<TDate extends Date | string | number | null> =
  MuiDatePickerProps<TDate> & MuiGridSxProps;
