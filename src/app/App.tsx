import { ApolloProvider } from "@apollo/client/react/context";
import { apolloClient } from "./apolloClient";
import { AuthStateInitLayer } from "./AuthStateInitLayer";
import { ThemeProvider } from "./ThemeProvider";
import { GlobalStyle } from "./GlobalStyle";
import { ToastContainer } from "./ToastContainer";
import { ErrorBoundary, WebViewContextProvider } from "../components";
import { AppRouter } from "./AppRouter";

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <WebViewContextProvider>
      <AuthStateInitLayer>
        <ErrorBoundary>
          <ThemeProvider>
            <GlobalStyle />
            <AppRouter />
            <ToastContainer />
          </ThemeProvider>
        </ErrorBoundary>
      </AuthStateInitLayer>
    </WebViewContextProvider>
  </ApolloProvider>
);
