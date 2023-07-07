import "dayjs/locale/en";
import dayjs from "dayjs";
import advancedFormatDayJsPlugin from "dayjs/plugin/advancedFormat";
import isBetweenDayJsPlugin from "dayjs/plugin/isBetween";
import localizedFormatDayJsPlugin from "dayjs/plugin/localizedFormat";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider as MuiLocalizationProvider,
  type LocalizationProviderProps,
} from "@mui/x-date-pickers/LocalizationProvider";
import type { Except } from "type-fest";

/**
 * This component provides date/time localization functionality using the Mui
 * `LocalizationProvider` with the `dayjs` adapter. This component is
 * necessary to run the Mui DatePicker/DateTimePicker components.
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

// DayJS Plugins:

dayjs.extend(advancedFormatDayJsPlugin); // provides 1-24 hour format used by logger util
dayjs.extend(isBetweenDayJsPlugin); // provides isBetween() method used by Dashboard itemDataParsers
dayjs.extend(localizedFormatDayJsPlugin); // provides local date format used in CheckoutPage

export type DateTimeLocalizationProviderProps = Except<
  LocalizationProviderProps<unknown, "en">,
  "dateAdapter" | "adapterLocale"
>;
