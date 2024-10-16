/**
 * Internal helper for creating global class names with a consistent format.
 */
const makeGlobalClassName = <T extends string>(name: T) => `global-class__${name}` as const;

/**
 * Global class names used in the app.
 */
export const globalClassNames = {
  /**
   * Class names related to global scrollbar-psuedo-element styles.
   * - See `src/app/GlobalStyles/useScrollbarStyles.ts` for details.
   */
  scrollbar: {
    /**
     * Ensure a scrollbar is never visible on an element.
     */
    forceHidden: makeGlobalClassName("scrollbar-force-hidden"),
    /**
     * Ensure a scrollbar is visible on an element where/when applicable.
     * > This class uses darker colors than `"scrollbar-force-show-paper-bg"`.
     */
    forceShow: makeGlobalClassName("scrollbar-force-show"),
    /**
     * Ensure a scrollbar is visible on an element where/when applicable.
     * > This class uses lighter colors than `"scrollbar-force-show"`.
     */
    forceShowPaperBG: makeGlobalClassName("scrollbar-force-show-paper-bg"),
  },
  /**
   * Class names related to global animation styles.
   * - See `src/app/GlobalStyles/animations.ts` for details.
   */
  animations: {
    /**
     * Performs a 350ms-long wiggle animation on the x-axis to achieve a "head shake"/"nuh-uh"
     * effect. This is meant to convey to the User that they've not yet provided a required input,
     * and/or that one or more of their inputs are invalid.
     */
    wiggleX: makeGlobalClassName("animation__wiggle-x"),
  },
} as const;
