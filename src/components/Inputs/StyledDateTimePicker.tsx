import { grid as muiGridSxProps, type GridProps as MuiGridSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import {
  DateTimePicker as MuiDateTimePicker,
  type DateTimePickerProps as MuiDateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";

/**
 * Mui DateTimePicker with Mui-system grid props like `gridArea`.
 *
 * Usage example:
 * ```
 * <StyledDateTimePicker gridArea="top-left" {...otherProps} />
 * ```
 */
export const StyledDateTimePicker = styled(MuiDateTimePicker, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<MuiGridSxProps>(muiGridSxProps) as <TDate extends Date | string | number | null = Date>(
  props: StyledDateTimePickerProps<TDate>
) => React.ReactElement;

export type StyledDateTimePickerProps<TDate extends Date | string | number | null> =
  MuiDateTimePickerProps<TDate> & MuiGridSxProps;
