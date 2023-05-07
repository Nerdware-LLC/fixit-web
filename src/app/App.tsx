import { ApolloProvider } from "@apollo/client/react/context";
import { ErrorBoundary } from "@components/ErrorBoundary";
import { RootAppRouter } from "@routers/RootAppRouter";
import { DateTimeLocalizationProvider } from "./DateTimeLocalizationProvider";
import { GlobalStyles } from "./GlobalStyles";
import { PageLayoutContextProvider } from "./PageLayoutContext";
import { ThemeProvider } from "./ThemeProvider";
import { ToastContainer } from "./ToastContainer";
import { WebViewContextProvider } from "./WebViewContext";
import { apolloClient } from "./apolloClient";

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <ErrorBoundary>
      <PageLayoutContextProvider>
        <WebViewContextProvider>
          <ThemeProvider>
            <DateTimeLocalizationProvider>
              <GlobalStyles />
              <RootAppRouter />
              <ToastContainer />
            </DateTimeLocalizationProvider>
          </ThemeProvider>
        </WebViewContextProvider>
      </PageLayoutContextProvider>
    </ErrorBoundary>
  </ApolloProvider>
);
