import { ThemeProvider } from "./ThemeProvider";
import { GlobalStyle } from "./GlobalStyle";
import { ToastContainer } from "./ToastContainer";
import { RootRouter } from "../navigation/RootRouter";
import { WebViewContextProvider } from "../components/WebView";

export const App = () => (
  <WebViewContextProvider>
    <ThemeProvider>
      <GlobalStyle />
      <RootRouter />
      <ToastContainer />
    </ThemeProvider>
  </WebViewContextProvider>
);
