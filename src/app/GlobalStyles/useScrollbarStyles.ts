import { alpha, type Theme } from "@mui/material/styles";
import { paperClasses } from "@mui/material/Paper";
import { globalClassNames } from "./classNames";
import type { CSSObject } from "@emotion/react";
import type { RootElementIdArg } from "./types";

/**
 * SCROLLBAR STYLES
 */
export const useScrollbarStyles = ({
  palette,
  variables: { isMobilePageLayout },
  rootElementID = "root",
}: Pick<Theme, "palette" | "variables"> & RootElementIdArg): Array<CSSObject> => {
  // Shared/dependent scrollbar style values:

  const trackDefaultBackgroundColor =
    palette.mode === "dark" ? palette.background.paper : alpha(palette.grey[400], 0.3);

  const trackPaperBackgroundColor = alpha(palette.background.default, 0.75);

  const thumbColor = palette.mode === "dark" ? palette.divider : alpha(palette.grey[600], 0.7);

  // This object contains all default scrollbar styles used in the app:
  const scrollbarStyles = {
    HIDDEN: {
      width: 0,
      height: 0,
      display: "none",
      appearance: "none",
      WebkitAppearance: "none",
    },
    VISIBLE: {
      SCROLLBAR: {
        width: isMobilePageLayout ? "0.75rem" : "1rem",
        display: "block",
        appearance: "auto",
        zIndex: 1,
      },
      THUMB: {
        display: "block",
        appearance: "auto",
        backgroundColor: thumbColor,
        ...(!isMobilePageLayout && {
          boxShadow: `inset 0 0 0.05rem 0.05rem ${thumbColor}`,
        }),
        zIndex: 1,
      },
      CORNER: {
        display: "block",
        appearance: "auto",
        backgroundColor: palette.background.default,
        zIndex: 1,
      },
      TRACK: {
        display: "block",
        appearance: "auto",
        backgroundColor: trackDefaultBackgroundColor,
        boxShadow: `inset 0 0 0.1rem 0.5rem ${trackDefaultBackgroundColor}`,
        zIndex: 1,
      },
      TRACK_PAPER_BG: {
        display: "block",
        appearance: "auto",
        backgroundColor: trackPaperBackgroundColor,
        boxShadow: `inset 0 0 0.1rem 0.1rem ${trackPaperBackgroundColor}`,
        zIndex: 1,
      },
    },
  } as const satisfies Record<string, CSSObject>;

  const scrollbarForceHidden = Object.fromEntries(
    Object.entries(scrollbarStyles.HIDDEN).map(([prop, value]) => [prop, `${value} !important`])
  );

  ////////////////////////////////////////////////////////////
  // <body> scrollbar styles (always hidden)

  const bodyElementScrollbarStyles = Object.fromEntries(
    SCROLLBAR_ELEMENT_NAMES.map((scrollbarEl) => [`body::${scrollbarEl}`, scrollbarForceHidden])
  );

  ////////////////////////////////////////////////////////////
  // Global-default scrollbar styles (layout dependent)

  const globalDefaultScrollbarStyles = {
    [`div#${rootElementID} *`]: isMobilePageLayout
      ? Object.fromEntries(
          SCROLLBAR_ELEMENT_NAMES.map((scrollbarEl) => [
            `&::${scrollbarEl}`,
            scrollbarStyles.HIDDEN,
          ])
        )
      : {
          "&::-webkit-scrollbar": scrollbarStyles.VISIBLE.SCROLLBAR,
          "&::-webkit-scrollbar-thumb": scrollbarStyles.VISIBLE.THUMB,
          "&::-webkit-scrollbar-corner": scrollbarStyles.VISIBLE.CORNER,
          "&::-webkit-scrollbar-track": scrollbarStyles.VISIBLE.TRACK,
          [`.${paperClasses.root} *`]: {
            "&::-webkit-scrollbar-track": scrollbarStyles.VISIBLE.TRACK_PAPER_BG,
          },
        },
  };

  ////////////////////////////////////////////////////////////
  // scrollbar-force-show, scrollbar-force-show-paper-bg (ensure scrollbar is visible)

  const scrollbarForceShowClassStyles = {
    [`.${globalClassNames.scrollbar.forceShow},.${globalClassNames.scrollbar.forceShowPaperBG}`]: {
      "&::-webkit-scrollbar": scrollbarStyles.VISIBLE.SCROLLBAR,
      "&::-webkit-scrollbar-thumb": scrollbarStyles.VISIBLE.THUMB,
      "&::-webkit-scrollbar-corner": scrollbarStyles.VISIBLE.CORNER,
      // Track color depends on whether or not the -paper-bg class is used
      [`&.${globalClassNames.scrollbar.forceShow}::-webkit-scrollbar-track`]: scrollbarStyles.VISIBLE.TRACK, // prettier-ignore
      [`&.${globalClassNames.scrollbar.forceShowPaperBG}::-webkit-scrollbar-track`]: scrollbarStyles.VISIBLE.TRACK_PAPER_BG, // prettier-ignore
    },
  };

  ////////////////////////////////////////////////////////////
  // scrollbar-force-show, scrollbar-force-show-paper-bg (ensure scrollbar is visible)

  const scrollbarForceHiddenClassStyles = {
    [`.${globalClassNames.scrollbar.forceHidden}`]: {
      "&::-webkit-scrollbar": scrollbarForceHidden,
      "&::-webkit-scrollbar-thumb": scrollbarForceHidden,
      "&::-webkit-scrollbar-corner": scrollbarForceHidden,
      "&::-webkit-scrollbar-track": scrollbarForceHidden,
    },
  };

  return [
    globalDefaultScrollbarStyles,
    scrollbarForceShowClassStyles,
    scrollbarForceHiddenClassStyles,
    bodyElementScrollbarStyles,
  ];
};

/** Dict of scrollbar pseudo-elements. */
const SCROLLBAR_ELEMENTS = {
  scrollbar: "-webkit-scrollbar",
  thumb: "-webkit-scrollbar-thumb",
  corner: "-webkit-scrollbar-corner",
  track: "-webkit-scrollbar-track",
} as const;

/** Array of scrollbar pseudo-element names. */
const SCROLLBAR_ELEMENT_NAMES = Object.values(SCROLLBAR_ELEMENTS);
