import "./setupDayjs.js";
import "./setupYup.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { PickerValidDate } from "@mui/x-date-pickers";
import type { LocalizationProviderProps } from "@mui/x-date-pickers/LocalizationProvider";
import type { Except } from "type-fest";

export type DateTimeLocalizationProviderProps = Except<
  LocalizationProviderProps<PickerValidDate, "en">,
  "dateAdapter" | "adapterLocale"
>;

/**
 * This component provides date/time localization functionality using the Mui
 * `LocalizationProvider` with the `dayjs` adapter. This component is necessary
 * to run the Mui DatePicker/DateTimePicker components.
 *
 * > Currently, only the `"en"` locale is supported.
 */
export const DateTimeLocalizationProvider = ({
  children,
  ...props
}: DateTimeLocalizationProviderProps) => (
  <MuiLocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en" {...props}>
    {children}
  </MuiLocalizationProvider>
);
