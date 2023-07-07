import { Suspense } from "react";
import { MemoryRouter, Routes, Route, type MemoryRouterProps } from "react-router-dom";
import {
  MockedProvider as MockedApolloProvider,
  type MockedProviderProps,
} from "@apollo/client/testing";
import { render } from "@testing-library/react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { DateTimeLocalizationProvider } from "@app/DateTimeLocalizationProvider";
import { PageLayoutContext } from "@app/PageLayoutContext";
import { THEMES } from "@app/ThemeProvider/themes";
import { apolloCache } from "@app/apolloCache";
import type { RenderOptions } from "@testing-library/react";

const DEFAULT_LAYOUT_CONTEXT = {
  isMobileUserAgent: false,
  isMobilePageLayout: false,
};

const Providers = ({ children, routerProps, apolloProviderProps = {} }: ProvidersProps) => {
  const element = routerProps ? (
    <MemoryRouter {...routerProps}>
      <Routes>
        <Route element={children} path={routerProps?.route} />
      </Routes>
    </MemoryRouter>
  ) : (
    children
  );

  return (
    <Suspense fallback={null}>
      <MockedApolloProvider cache={apolloCache} {...apolloProviderProps}>
        <PageLayoutContext.Provider value={DEFAULT_LAYOUT_CONTEXT}>
          <ThemeProvider theme={{ ...THEMES.DARK, variables: DEFAULT_LAYOUT_CONTEXT }}>
            <DateTimeLocalizationProvider>{element}</DateTimeLocalizationProvider>
          </ThemeProvider>
        </PageLayoutContext.Provider>
      </MockedApolloProvider>
    </Suspense>
  );
};

export const renderWithProviders = (
  ui: React.ReactElement,
  options: RenderProvidersOptions = {}
) => {
  const { providersProps = {}, ...renderOpts } = options;

  const renderResult = render(ui, {
    wrapper: ({ children }) => <Providers {...providersProps}>{children}</Providers>,
    ...renderOpts,
  });

  return {
    ...renderResult,
    rerender: (ui: React.ReactElement, rerenderOptions?: RenderProvidersOptions) =>
      renderWithProviders(ui, {
        container: renderResult.container,
        ...options,
        ...rerenderOptions,
      }),
  };
};

export { renderWithProviders as render }; // export alias
export { screen } from "@testing-library/react";

export interface RenderProvidersOptions extends RenderOptions {
  providersProps?: Omit<ProvidersProps, "children">;
}

interface ProvidersProps {
  apolloProviderProps?: Omit<MockedProviderProps, "cache">;
  routerProps?: MemoryRouterProps & { route?: string };
  children: React.ReactNode;
}
