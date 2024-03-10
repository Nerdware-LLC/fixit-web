import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { themeStore } from "@/stores/themeStore";
import { useAppThemeObject } from "./useAppThemeObject";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeName = themeStore.useSubToStore();
  const theme = useAppThemeObject(themeName);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
