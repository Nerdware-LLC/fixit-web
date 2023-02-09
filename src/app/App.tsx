import { ApolloProvider } from "@apollo/client/react/context";
import { apolloClient } from "./apolloClient";
import { PageLayoutContextProvider } from "./PageLayoutContext";
import { WebViewContextProvider } from "./WebViewContext";
import { ThemeProvider } from "./ThemeProvider";
import { LocalizationProvider } from "./LocalizationProvider";
import { GlobalStyle } from "./GlobalStyle";
import { ToastContainer } from "./ToastContainer";
import { RootAppRouter } from "@navigation";
import { ErrorBoundary } from "@components";

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <ErrorBoundary>
      <PageLayoutContextProvider>
        <WebViewContextProvider>
          <ThemeProvider>
            <LocalizationProvider>
              <GlobalStyle />
              <RootAppRouter />
              <ToastContainer />
            </LocalizationProvider>
          </ThemeProvider>
        </WebViewContextProvider>
      </PageLayoutContextProvider>
    </ErrorBoundary>
  </ApolloProvider>
);
