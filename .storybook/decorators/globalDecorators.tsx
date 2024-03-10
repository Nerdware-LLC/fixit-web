import { DecoratorHelpers } from "@storybook/addon-themes";
import CssBaseline from "@mui/material/CssBaseline";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import { GlobalStyles } from "@/app/GlobalStyles";
import { PageLayoutContextProvider } from "@/app/PageLayoutContext";
import { THEMES, THEME_NAMES, type ThemeName } from "@/app/ThemeProvider/themes";
import { useAppThemeObject } from "@/app/ThemeProvider/useAppThemeObject";
import { DateTimeLocalizationProvider } from "@/app/localization";
import type { ReactRenderer } from "@storybook/react";
import type { DecoratorFunction } from "@storybook/types";

const { initializeThemeState } = DecoratorHelpers;

/**
 * This custom global decorator replaces the default `withThemeFromJSXProvider` exported by
 * `@storybook/addon-themes`. It is functionally equivalent to the app's custom `ThemeProvider`
 * wrapper which extends the Mui theme-context-object with the `variables` listed below, thereby
 * making them available in `styled` component definitions and `sx` prop values.
 *
 * - `isMobilePageLayout`
 * - `isMobileUserAgent`
 *
 * @see https://github.com/storybookjs/storybook/blob/next/code/addons/themes/docs/api.md#writing-a-custom-decorator
 */
const withCustomThemeProvider = (): DecoratorFunction<ReactRenderer> => {
  const DEFAULT_THEME: ThemeName = THEME_NAMES.DARK;
  initializeThemeState(Object.keys(THEMES), DEFAULT_THEME);

  return (storyFn, { globals, parameters }) => {
    const themeFromGlobals = globals?.theme;
    const themeOverrideFromParameters = parameters?.themes?.themeOverride;

    const selectedTheme = themeOverrideFromParameters || themeFromGlobals || DEFAULT_THEME;

    const theme = useAppThemeObject(selectedTheme);

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles rootElementID="storybook-root" />
        {storyFn()}
      </MuiThemeProvider>
    );
  };
};

/**
 * Global decorators which wrap all stories.
 *
 * > NOTE: The order of decorators is important - they are applied in the order they are listed,
 *   but counter-intuitively, _higher_ index decorators wrap _lower_ index decorators.
 */
export const globalDecorators: Array<DecoratorFunction<ReactRenderer>> = [
  // DateTimeLocalizationProvider
  (Story) => (
    <DateTimeLocalizationProvider>
      <Story />
    </DateTimeLocalizationProvider>
  ),
  // ThemeProvider
  withCustomThemeProvider(),
  // PageLayoutContextProvider
  (Story) => (
    <PageLayoutContextProvider>
      <Story />
    </PageLayoutContextProvider>
  ),
];
