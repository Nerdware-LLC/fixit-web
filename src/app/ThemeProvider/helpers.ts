import { alpha, getOverlayAlpha, type Theme, type SxProps } from "@mui/material/styles";

/**
 * Mui Paper Styles
 *
 * This fn takes an `elevation` number (0-24 inclusive) along with relevant
 * MuiTheme properties, and returns an object with styles that'd be applied
 * to a Mui Paper component with the given elevation. This is useful for
 * styling components that are not Mui Paper components but where Paper-like
 * styles are desired.
 *
 * @see https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Paper/Paper.js
 */
export const getMuiPaperStyles = (
  elevation: number,
  { palette, transitions, shadows }: Pick<Theme, "palette" | "transitions" | "shadows">
) => ({
  backgroundColor: palette.background.paper,
  transition: transitions.create(["box-shadow"]),
  boxShadow: shadows[elevation],
  ...(palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${getPaperBgColorsString(elevation)})`,
  }),
});

const getPaperBgColorsString = (elevation: number) => {
  const color = alpha("#fff", Number(getOverlayAlpha(elevation)));
  return `${color}, ${color}`;
};

/**
 * Mui {@link SxProps} with the app's {@link Theme}.
 */
export type SxPropsWithTheme = SxProps<Theme>;
