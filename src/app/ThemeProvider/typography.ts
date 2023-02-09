import type { Theme } from "@mui/material/styles";

const FONT_FAMILY = {
  fontFamily: '"Roboto", sans-serif'
};

/**
 * Mui theme typography properties
 *
 * | `Mui Variant` | `Custom Font Size (rem)` | `Mui Default (rem)` | `Browser Default (em)` |
 * | :------------ | :----------------------: | :-----------------: | :--------------------: |
 * | h1            |         4                |      6              |        2               |
 * | h2            |         3                |      3.75           |        1.5             |
 * | h3            |         2.5              |      3              |        1.17            |
 * | h4            |         2                |      2.125          |        1               |
 * | h5            |                          |      1.5            |        0.83            |
 * | h6            |                          |      1.25           |        0.67            |
 * | subtitle1     |                          |      1              |                        |
 * | subtitle2     |                          |      0.875          |                        |
 * | body1         |                          |      1              |                        |
 * | body2         |                          |      0.875          |                        |
 * | caption       |                          |      0.75           |                        |
 * | button        |         1                |      0.875          |                        |
 * | overline      |                          |      0.75           |                        |
 */
export const TYPOGRAPHY: Partial<Theme["typography"]> = {
  htmlFontSize: 16, // a11y-friendly browser default base font-size
  ...FONT_FAMILY,
  h1: {
    ...FONT_FAMILY,
    fontSize: "4rem"
  },
  h2: {
    ...FONT_FAMILY,
    fontSize: "3rem"
  },
  h3: {
    ...FONT_FAMILY,
    fontSize: "2.5rem"
  },
  h4: {
    ...FONT_FAMILY,
    fontSize: "2rem"
  },
  h5: FONT_FAMILY,
  h6: FONT_FAMILY,
  subtitle1: FONT_FAMILY,
  subtitle2: FONT_FAMILY,
  body1: FONT_FAMILY,
  body2: FONT_FAMILY,
  caption: FONT_FAMILY,
  overline: FONT_FAMILY,
  button: {
    ...FONT_FAMILY,
    fontSize: "1rem",
    fontWeight: "bold"
  }
};
