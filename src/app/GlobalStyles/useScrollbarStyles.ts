import { css, type CSSObject, type SerializedStyles } from "@emotion/react";
import { alpha, type Theme } from "@mui/material/styles";
import { paperClasses } from "@mui/material/Paper";
import { globalClassNames } from "./classNames";

export const useScrollbarStyles = ({
  palette,
  variables: { isMobilePageLayout },
}: Theme): SerializedStyles => {
  const trackDefaultBackgroundColor =
    palette.mode === "dark" ? palette.background.paper : alpha(palette.grey[400], 0.3);

  // Reusable scrollbar styles
  const scrollbarStyles: { HIDDEN: CSSObject; VISIBLE: Record<string, CSSObject> } = {
    HIDDEN: {
      width: 0,
      display: "none",
      appearance: "none",
      WebkitAppearance: "none",
    },
    VISIBLE: {
      SCROLLBAR: {
        width: isMobilePageLayout ? "0.75rem" : "1rem",
        display: "block",
        appearance: "auto",
      },
      THUMB: {
        display: "block",
        appearance: "auto",
        backgroundColor: palette.divider,
        ...(!isMobilePageLayout && {
          boxShadow: `inset 0 0 0.05rem 0.05rem ${palette.divider}`,
        }),
      },
      CORNER: {
        display: "block",
        appearance: "auto",
        backgroundColor: palette.background.default,
      },
      TRACK: {
        display: "block",
        appearance: "auto",
        backgroundColor: trackDefaultBackgroundColor,
        boxShadow: `inset 0 0 0.1rem 0.5rem ${trackDefaultBackgroundColor}`,
      },
      TRACK_PAPER_BG: {
        display: "block",
        appearance: "auto",
        backgroundColor: alpha(palette.background.default, 0.75),
        boxShadow: `inset 0 0 0.1rem 0.1rem ${alpha(palette.background.default, 0.75)}`,
      },
    },
  };

  ////////////////////////////////////////////////////////////
  // Global-default scrollbar styles (layout dependent)

  // prettier-ignore
  const globalDefaultScrollbarStyles = isMobilePageLayout
    ? SCROLLBAR_ELEMENT_NAMES.reduce((accum, scrollbarElementName) => ({
        ...accum,
        [`*::${scrollbarElementName}`]: scrollbarStyles.HIDDEN
      }), {})
    : {
        "*::-webkit-scrollbar": scrollbarStyles.VISIBLE.SCROLLBAR,
        "*::-webkit-scrollbar-thumb": scrollbarStyles.VISIBLE.THUMB,
        "*::-webkit-scrollbar-corner": scrollbarStyles.VISIBLE.CORNER,
        "*::-webkit-scrollbar-track": scrollbarStyles.VISIBLE.TRACK,
        [`.${paperClasses.root} ::-webkit-scrollbar-track`]: scrollbarStyles.VISIBLE.TRACK_PAPER_BG
      };

  ////////////////////////////////////////////////////////////
  // scrollbar-force-show, scrollbar-force-show-paper-bg (ensure scrollbar is visible)

  const scrollbarForceShowStyles = {
    [`.${globalClassNames.scrollbarForceShow},.${globalClassNames.scrollbarForceShowPaperBG}`]: {
      [`&::${SCROLLBAR_ELEMENTS.SCROLLBAR}`]: scrollbarStyles.VISIBLE.SCROLLBAR,
      [`&::${SCROLLBAR_ELEMENTS.THUMB}`]: scrollbarStyles.VISIBLE.THUMB,
      [`&::${SCROLLBAR_ELEMENTS.CORNER}`]: scrollbarStyles.VISIBLE.CORNER,
      // Track color depends on whether or not the -paper-bg class is used
      [`&.${globalClassNames.scrollbarForceShow}::${SCROLLBAR_ELEMENTS.TRACK}`]:
        scrollbarStyles.VISIBLE.TRACK,
      [`&.${globalClassNames.scrollbarForceShowPaperBG}::${SCROLLBAR_ELEMENTS.TRACK}`]:
        scrollbarStyles.VISIBLE.TRACK_PAPER_BG,
    },
  };

  return css(globalDefaultScrollbarStyles, scrollbarForceShowStyles);
};

const SCROLLBAR_ELEMENTS = {
  SCROLLBAR: "-webkit-scrollbar",
  TRACK: "-webkit-scrollbar-track",
  THUMB: "-webkit-scrollbar-thumb",
  CORNER: "-webkit-scrollbar-corner",
};

const SCROLLBAR_ELEMENT_NAMES = Object.values(SCROLLBAR_ELEMENTS);
