import { useTheme, alpha } from "@mui/material/styles";
import { Global as EmotionGlobalStyle, css } from "@emotion/react";
import { usePageLayoutContext } from "./PageLayoutContext";

export const GlobalStyle = () => {
  const { palette } = useTheme();
  const { isMobilePageLayout } = usePageLayoutContext();

  const scrollbarHideOnMobile = css`
    display: none;
    appearance: none;
    -webkit-appearance: none;
  `;

  const scrollbarStyles = !isMobilePageLayout
    ? css`
        /* Desktop scrollbar styles */

        *::-webkit-scrollbar {
          width: 1rem;
        }

        *::-webkit-scrollbar-track {
          background-color: ${palette.background.paper};
          box-shadow: inset 0 0 0.1rem 0.5rem ${palette.background.paper};
        }

        *::-webkit-scrollbar-thumb {
          background-color: ${palette.divider};
          box-shadow: inset 0 0 0.05rem 0.05rem ${palette.divider};
        }

        /* When scrollbar is a descendent of MuiPaper, change colors */

        .MuiPaper-root ::-webkit-scrollbar-track {
          background-color: ${alpha(palette.background.default, 0.75)};
          box-shadow: inset 0 0 0.1rem 0.1rem ${alpha(palette.background.default, 0.75)};
        }
      `
    : css`
        *::-webkit-scrollbar {
          width: 0;
          ${scrollbarHideOnMobile}
        }

        *::-webkit-scrollbar-track {
          ${scrollbarHideOnMobile}
        }

        *::-webkit-scrollbar-thumb {
          ${scrollbarHideOnMobile}
        }
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

        ${scrollbarStyles}
      `}
    />
  );
};
