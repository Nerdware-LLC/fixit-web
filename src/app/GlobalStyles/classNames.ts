/**
 * Global class names used in the app.
 */
export const globalClassNames = {
  /**
   * A class name which when applied to an element, will ensure a scrollbar is
   * never visible on that element where/when applicable. The relevant styles
   * applied to this class are defined in `useScrollbarStyles`.
   */
  scrollbarForceHidden: "scrollbar-force-hidden",
  /**
   * A class name which when applied to an element, will ensure a scrollbar is
   * visible on that element where/when applicable. The relevant styles applied
   * to this class are defined in `useScrollbarStyles`.
   *
   * > This class uses darker colors than `scrollbarForceShowPaperBG`.
   */
  scrollbarForceShow: "scrollbar-force-show",
  /**
   * A class name which when applied to an element, will ensure a scrollbar is
   * visible on that element where/when applicable. The relevant styles applied
   * to this class are defined in `useScrollbarStyles`.
   *
   * > This class uses lighter colors than `scrollbarForceShow`.
   */
  scrollbarForceShowPaperBG: "scrollbar-force-show-paper-bg",
} as const;
