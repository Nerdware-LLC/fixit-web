import CssBaseline from "@mui/material/CssBaseline";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import { usePageLayoutContext } from "@app/PageLayoutContext/usePageLayoutContext";
import { themeStore } from "@app/apolloCache/reactiveVars/themeStore";
import { THEMES } from "./themes";
import type { Theme } from "@mui/material/styles";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const themeName = themeStore.useSubToStore();
  const { isMobileUserAgent, isMobilePageLayout } = usePageLayoutContext();

  const theme: Theme = {
    ...THEMES[themeName || "DARK"], // A fallback themeName for added safety (will crash if not set)
    variables: {
      isMobileUserAgent,
      isMobilePageLayout,
    },
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export type ThemeProviderProps = { children: React.ReactNode };
