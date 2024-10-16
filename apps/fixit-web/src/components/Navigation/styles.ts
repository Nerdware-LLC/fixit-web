import type { CSSObject } from "@emotion/react";
import type { Theme } from "@mui/material/styles";

/**
 * Default styles for the `Link` and `Anchor` components.
 */
export const getDefaultLinkStyles = ({ theme: { palette } }: { theme: Theme }) =>
  ({
    display: "inline",
    // If display=flex/inline-flex, center contents by default:
    alignItems: "center",
    justifyContent: "center",

    color: palette.info.main,
    lineHeight: 1.2,

    textDecoration: "underline dotted",
    textDecorationThickness: "1px",
    textUnderlineOffset: "-12%",
    textUnderlinePosition: "under",

    "&:hover": {
      cursor: "pointer",
      opacity: 0.7,
    },
  }) satisfies CSSObject;
