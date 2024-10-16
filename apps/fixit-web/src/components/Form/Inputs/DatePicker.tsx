import { getTypeSafeError } from "@nerdware/ts-type-safety-utils";
import { grid as muiGridSxProps, type GridProps as MuiGridSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import {
  DesktopDatePicker,
  type DesktopDatePickerProps,
} from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker, type MobileDatePickerProps } from "@mui/x-date-pickers/MobileDatePicker";
import { formClassNames } from "../classNames.js";
import { useFormikFieldProps, type FormikIntegratedInputProps } from "../helpers";
import type { TextFieldProps } from "@mui/material/TextField";
import type { Dayjs as DayJsObject } from "dayjs";
import type { Simplify } from "type-fest";

export type DatePickerProps = Simplify<
  FormikIntegratedInputProps<
    MobileDatePickerProps<DayJsObject> & DesktopDatePickerProps<DayJsObject>,
    "onChange" | "onOpen"
  > &
    Pick<TextFieldProps, "variant" | "style"> & // <-- props passed to the TextField slot
    MuiGridSxProps &
    React.RefAttributes<HTMLDivElement>
>;

/**
 * Mui DatePicker with Formik bindings and Mui-system grid props like `gridArea`.
 * If event handler functions like `onChange`/`onOpen` are provided as props to this
 * component, they are called after the Formik handlers with all available arguments
 * if no errors occur.
 *
 * ### Layout Responsiveness
 *
 * If `isMobilePageLayout` from `PageLayoutContext` is `true`, the `MobileDatePicker`
 * is rendered - otherwise, the `DesktopDatePicker` is rendered.
 *
 * > **_Q: Why not use the "responsive" `DatePicker` Mui provides?_**
 * >
 * > A: The [internal logic Mui uses][mui-dp] for the responsive `DatePicker` is
 *   based on css media queries using their `useMediaQuery` hook, and that approach
 *   simply does not achieve the desired behavior for this use case.
 *
 * ### SlotProps
 *
 * The `variant` and `style` props, if provided, are passed to the `TextField` slot
 * (defaults to `"outlined"` on mobile and `"filled"` on desktop).
 *
 * @example
 * ```tsx
 * <DatePicker id="my-date-field" gridArea="top-left" {...otherProps} />
 * ```
 *
 * [mui-dp]: https://github.com/mui/mui-x/blob/next/packages/x-date-pickers/src/DatePicker/DatePicker.tsx
 */
export const DatePicker = ({
  fieldID,
  onChange: callerOnChangeHandler,
  onOpen: callerOnOpenHandler,
  variant: explicitVariant,
  style,
  slotProps = {},
  className: additionalClassNames = "",
  ...props
}: DatePickerProps) => {
  const [{ value: fieldValue, variant }, { setValue, setTouched, setError, isMobilePageLayout }] =
    useFormikFieldProps<DayJsObject | null>({
      fieldID,
      variant: explicitVariant,
    });

  const handleFieldValueChange: DatePickerProps["onChange"] = async (value, context) => {
    try {
      await setValue(value);
      if (callerOnChangeHandler) await callerOnChangeHandler(value, context);
    } catch (error) {
      setError(getTypeSafeError(error).message);
    }
  };

  const handleOpenPicker: DatePickerProps["onOpen"] = async () => {
    try {
      await setTouched(true);
      if (callerOnOpenHandler) await callerOnOpenHandler();
    } catch (error) {
      setError(getTypeSafeError(error).message);
    }
  };

  // Props passed to the Mui DesktopDatePicker/MobileDatePicker
  const datePickerProps = {
    value: fieldValue,
    onChange: handleFieldValueChange,
    onOpen: handleOpenPicker,
    className: `${formClassNames.dateInput} ${additionalClassNames}`,
    slotProps: {
      textField: {
        variant,
        style,
        ...(slotProps.textField ?? {}),
      },
      ...slotProps,
    },
    ...props,
  };

  return isMobilePageLayout ? (
    <StyledMobileDatePicker {...datePickerProps} />
  ) : (
    <StyledDesktopDatePicker {...datePickerProps} />
  );
};

export const StyledMobileDatePicker = styled(MobileDatePicker, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<MuiGridSxProps>(muiGridSxProps) as typeof MobileDatePicker;

export const StyledDesktopDatePicker = styled(DesktopDatePicker, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<MuiGridSxProps>(muiGridSxProps) as typeof DesktopDatePicker;
