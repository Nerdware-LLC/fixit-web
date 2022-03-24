import { ThemeProvider } from "./ThemeProvider";
import { GlobalStyle } from "./GlobalStyle";
import { ToastContainer } from "./ToastContainer";
import { AppRouter } from "./AppRouter";
import { ErrorBoundary } from "../components";

export const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <GlobalStyle />
      <AppRouter />
      <ToastContainer />
    </ThemeProvider>
  </ErrorBoundary>
);
