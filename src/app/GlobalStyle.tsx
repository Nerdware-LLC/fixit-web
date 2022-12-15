import { useTheme } from "@mui/material/styles";
import { Global as EmotionGlobalStyle, css } from "@emotion/react";

export const GlobalStyle = () => {
  const { palette } = useTheme();

  // Can't add margin/padding to webkit-scrollbar, so border is used instead
  const scrollbarEmulatedMargin = css`
    border-style: solid;
    border-color: ${palette.background.default};
    border-width: 0 0 0 1rem;
  `;

  return (
    <EmotionGlobalStyle
      styles={css`
        * {
          box-sizing: border-box;
        }

        html {
          -webkit-text-size-adjust: 100%;
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

        *::-webkit-scrollbar {
          width: 2rem;
        }

        *::-webkit-scrollbar-track {
          background-color: ${palette.background.paper};
          box-shadow: inset 0 0 0.1rem 0.1rem ${palette.background.paper};
          ${scrollbarEmulatedMargin}
        }

        *::-webkit-scrollbar-thumb {
          background-color: ${palette.divider};
          box-shadow: inset 0 0 0.05rem 0.05rem ${palette.divider};
          ${scrollbarEmulatedMargin};
        }
      `}
    />
  );
};
