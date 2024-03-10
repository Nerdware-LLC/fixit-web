import type { Theme } from "@mui/material/styles";

/**
 * Mui theme typography properties
 *
 * | `Mui Variant` | `Mui Default (rem)` | `Browser Default (em)` |
 * | :------------ | :-----------------: | :--------------------: |
 * | h1            |      6              |        2               |
 * | h2            |      3.75           |        1.5             |
 * | h3            |      3              |        1.17            |
 * | h4            |      2.125          |        1               |
 * | h5            |      1.5            |        0.83            |
 * | h6            |      1.25           |        0.67            |
 * | subtitle1     |      1              |                        |
 * | subtitle2     |      0.875          |                        |
 * | body1         |      1              |                        |
 * | body2         |      0.875          |                        |
 * | caption       |      0.75           |                        |
 * | button        |      0.875          |                        |
 * | overline      |      0.75           |                        |
 */
export const TYPOGRAPHY = {
  htmlFontSize: 16, // a11y-friendly browser default base font-size
  fontFamily: '"Roboto", sans-serif',
  button: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
} as const satisfies Partial<Theme["typography"]>;
