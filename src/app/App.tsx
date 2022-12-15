import { ApolloProvider } from "@apollo/client/react/context";
import { apolloClient } from "./apolloClient";
import { ThemeProvider } from "./ThemeProvider";
import { LocalizationProvider } from "./LocalizationProvider";
import { GlobalStyle } from "./GlobalStyle";
import { ToastContainer } from "./ToastContainer";
import { AppRouter } from "@navigation";
import { ErrorBoundary, PageLayoutContextProvider, WebViewContextProvider } from "@components";

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <ErrorBoundary>
      <PageLayoutContextProvider>
        <WebViewContextProvider>
          <ThemeProvider>
            <LocalizationProvider>
              <GlobalStyle />
              <AppRouter />
              <ToastContainer />
            </LocalizationProvider>
          </ThemeProvider>
        </WebViewContextProvider>
      </PageLayoutContextProvider>
    </ErrorBoundary>
  </ApolloProvider>
);
