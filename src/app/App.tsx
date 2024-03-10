import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "@/components/Alerts";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RootAppRouter } from "@/routes/RootAppRouter";
import { ApolloProvider } from "./ApolloProvider";
import { FetchStateContextProvider } from "./FetchStateContext";
import { GlobalStyles } from "./GlobalStyles";
import { PageLayoutContextProvider } from "./PageLayoutContext";
import { ThemeProvider } from "./ThemeProvider";
import { DateTimeLocalizationProvider } from "./localization";

/**
 * ```
 *  ███████╗ ██╗ ██╗  ██╗ ██╗ ████████╗
 *  ██╔════╝ ██║ ╚██╗██╔╝ ██║ ╚══██╔══╝
 *  █████╗   ██║  ╚███╔╝  ██║    ██║
 *  ██╔══╝   ██║  ██╔██╗  ██║    ██║
 *  ██║      ██║ ██╔╝ ██╗ ██║    ██║
 *  ╚═╝      ╚═╝ ╚═╝  ╚═╝ ╚═╝    ╚═╝
 * ```
 */
export const App = () => (
  <ApolloProvider>
    <ErrorBoundary>
      <PageLayoutContextProvider>
        <DateTimeLocalizationProvider>
          <ThemeProvider>
            <CssBaseline />
            <GlobalStyles />
            <ToastContainer />
            <FetchStateContextProvider>
              <RootAppRouter />
            </FetchStateContextProvider>
          </ThemeProvider>
        </DateTimeLocalizationProvider>
      </PageLayoutContextProvider>
    </ErrorBoundary>
  </ApolloProvider>
);
