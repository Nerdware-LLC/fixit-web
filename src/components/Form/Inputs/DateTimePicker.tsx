import { getTypeSafeError } from "@nerdware/ts-type-safety-utils";
import { grid as muiGridSxProps, type GridProps as MuiGridSxProps } from "@mui/system";
import { styled } from "@mui/material/styles";
import {
  DesktopDateTimePicker,
  type DesktopDateTimePickerProps,
} from "@mui/x-date-pickers/DesktopDateTimePicker";
import {
  MobileDateTimePicker,
  type MobileDateTimePickerProps,
} from "@mui/x-date-pickers/MobileDateTimePicker";
import { formClassNames } from "../classNames.js";
import { useFormikFieldProps, type FormikIntegratedInputProps } from "../helpers";
import type { TextFieldProps } from "@mui/material/TextField";
import type { Dayjs as DayjsObject } from "dayjs";
import type { Simplify } from "type-fest";

export type DateTimePickerProps = Simplify<
  FormikIntegratedInputProps<
    MobileDateTimePickerProps<DayjsObject> & DesktopDateTimePickerProps<DayjsObject>,
    "onChange" | "onOpen"
  > &
    Pick<TextFieldProps, "variant" | "style"> & // <-- props passed to the TextField slot
    MuiGridSxProps &
    React.RefAttributes<HTMLDivElement>
>;

/**
 * Mui DateTimePicker with Formik bindings and Mui-system grid props like `gridArea`.
 * If event handler functions like `onChange`/`onOpen` are provided as props to this
 * component, they are called after the Formik handlers with all available arguments
 * if no errors occur.
 *
 * ### Layout Responsiveness
 *
 * If `isMobilePageLayout` from `PageLayoutContext` is `true`, the `MobileDateTimePicker`
 * is rendered - otherwise, the `DesktopDateTimePicker` is rendered.
 *
 * > **_Q: Why not use the "responsive" `DateTimePicker` Mui provides?_**
 * >
 * > A: The [internal logic Mui uses][mui-dtp] for the responsive `DateTimePicker` is
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
 * <DateTimePicker id="my-datetime-field" gridArea="top-left" {...otherProps} />
 * ```
 *
 * [mui-dtp]: https://github.com/mui/mui-x/blob/next/packages/x-date-pickers/src/DateTimePicker/DateTimePicker.tsx
 */
export const DateTimePicker = ({
  fieldID,
  onChange: callerOnChangeHandler,
  onOpen: callerOnOpenHandler,
  variant: explicitVariant,
  style,
  slotProps = {},
  className: additionalClassNames = "",
  ...props
}: DateTimePickerProps) => {
  const [{ value: fieldValue, variant }, { setValue, setTouched, setError, isMobilePageLayout }] =
    useFormikFieldProps<DayjsObject | null>({
      fieldID,
      variant: explicitVariant,
    });

  const handleFieldValueChange: DateTimePickerProps["onChange"] = async (value, context) => {
    try {
      await setValue(value);
      if (callerOnChangeHandler) await callerOnChangeHandler(value, context);
    } catch (error) {
      setError(getTypeSafeError(error).message);
    }
  };

  const handleOpenPicker: DateTimePickerProps["onOpen"] = async () => {
    try {
      await setTouched(true);
      if (callerOnOpenHandler) await callerOnOpenHandler();
    } catch (error) {
      setError(getTypeSafeError(error).message);
    }
  };

  // Props passed to the Mui DesktopDateTimePicker/MobileDateTimePicker
  const dateTimePickerProps = {
    value: fieldValue,
    onChange: handleFieldValueChange,
    onOpen: handleOpenPicker,
    className: `${formClassNames.dateTimeInput} ${additionalClassNames}`,
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
    <StyledMobileDateTimePicker {...dateTimePickerProps} />
  ) : (
    <StyledDesktopDateTimePicker {...dateTimePickerProps} />
  );
};

export const StyledMobileDateTimePicker = styled(MobileDateTimePicker, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<MuiGridSxProps>(muiGridSxProps) as typeof MobileDateTimePicker;

export const StyledDesktopDateTimePicker = styled(DesktopDateTimePicker, {
  shouldForwardProp: (propName: string) => !propName.startsWith("grid"),
})<MuiGridSxProps>(muiGridSxProps) as typeof DesktopDateTimePicker;
