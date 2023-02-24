import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

/**
 * This component provides dateTime localization functionality, and
 * is necessary to run the DateTimePicker components.
 */
export const LocalizationProvider = ({ children }: { children: React.ReactNode }) => (
  <MuiLocalizationProvider dateAdapter={AdapterMoment}>{children}</MuiLocalizationProvider>
);
