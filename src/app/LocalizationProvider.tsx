import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import type {} from "@mui/x-date-pickers/themeAugmentation"; // see jsdoc

/**
 * This component provides dateTime localization functionality, and
 * is necessary to run the DateTimePicker components.
 *
 * - Why the empty type import from @mui/x-date-pickers? See link below.
 *   https://mui.com/x/react-date-pickers/getting-started/#typescript
 */
export const LocalizationProvider = ({ children }: { children: React.ReactNode }) => (
  <MuiLocalizationProvider dateAdapter={AdapterMoment}>{children}</MuiLocalizationProvider>
);
