import React from "react";
import { Global as EmotionGlobalStyle, css } from "@emotion/react";

export const GlobalStyle = () => (
  <EmotionGlobalStyle
    styles={css`
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
      }
    `}
  />
);
