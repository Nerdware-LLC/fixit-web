import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { usePageLayoutContext } from "@app/PageLayoutContext";
import { themeStore } from "@app/apolloCache/reactiveVars";
import { THEMES } from "./themes";
import type { Theme } from "@mui/material/styles";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeName = themeStore.useSubToStore();
  const { isMobileUserAgent, isMobilePageLayout } = usePageLayoutContext();

  const theme: Theme = {
    ...THEMES[themeName],
    variables: {
      isMobileUserAgent,
      isMobilePageLayout
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
