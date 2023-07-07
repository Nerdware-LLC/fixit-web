import { Global as EmotionGlobalStyle, css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import { filledInputClasses } from "@mui/material/FilledInput";
import { inputBaseClasses } from "@mui/material/InputBase";
import { useScrollbarStyles } from "./useScrollbarStyles";

export const GlobalStyles = () => {
  const theme = useTheme();
  const scrollbarStyles = useScrollbarStyles(theme);

  const globalStyles = css(
    {
      "*": {
        boxSizing: "border-box",
      },
      "html": {
        WebkitTextSizeAdjust: "100%",
      },
      "body": {
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        fontFamily: "Roboto, sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      "div#root": {
        // The "root" element's ID attribute is set in the public/index.html file
        height: "100dvh",
        minHeight: "100svh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
        zIndex: 1,
      },
      "code": {
        fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
      },
    },
    scrollbarStyles,
    {
      /* For multiline Mui TextField inputs with variant="filled", this style moves
      padding from the InputBase to the textarea to ensure the scrollbar sits next
      to the edge of the input rather than floating in the middle.  */
      [`& .${inputBaseClasses.root}.${inputBaseClasses.multiline}.${filledInputClasses.root}`]: {
        "paddingRight": 0,
        "paddingBottom": 0,
        "& textarea": {
          paddingBottom: "0.5rem",
        },
      },
    }
  );

  return <EmotionGlobalStyle styles={globalStyles} />;
};
