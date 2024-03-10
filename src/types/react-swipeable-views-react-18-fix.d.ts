/**
 * This module declaration provides types for `react-swipeable-views-react-18-fix`,
 * which is a drop-in replacement for `react-swipeable-views` that has been made
 * necessary by the [abandonment and subsequent deprecation of the original package
 * ][react-swipeable-views-depd].
 *
 * The types exported here are copied from [`@types/react-swipeable-views`
 * ][types-react-swipeable-views]. Ideally, the module declaration would simply
 * include `export * from "@types/react-swipeable-views"` but that results in the
 * following TS error:
 *
 * > ```console
 * > Cannot import type declaration files. Consider importing 'react-swipeable-views'
 * > instead of '@types/react-swipeable-views'.ts(6137)
 * > ```
 *
 * @see
 * - [`react-swipeable-views` deprecation notice][react-swipeable-views-depd]
 * - [`@types/react-swipeable-views` source code][types-react-swipeable-views]
 *
 * [react-swipeable-views-depd]: https://github.com/oliviertassinari/react-swipeable-views/issues/676#issue-1402013574
 * [types-react-swipeable-views]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-swipeable-views/index.d.ts
 */
declare module "react-swipeable-views-react-18-fix" {
  // Copied from `@types/react-swipeable-views` (see above jsdoc):

  export type OnChangeIndexCallback = (index: number, indexLatest: number) => void;

  export type OnTransitionEndCallback = () => void;

  export type OnSwitchingCallback = (
    index: number,
    type: OnSwitchingCallbackTypeDescriptor
  ) => void;

  export type OnSwitchingCallbackTypeDescriptor = "move" | "end";

  export type AxisType = "x" | "x-reverse" | "y" | "y-reverse";

  export interface Actions {
    updateHeight: UpdateHeightAction;
  }

  export type ActionCallback = (actions: Actions) => void;

  export type UpdateHeightAction = () => void;

  export interface SpringConfig {
    duration: string;
    easeFunction: string;
    delay: string;
  }

  export interface SwipeableViewsProps extends Omit<React.HTMLProps<HTMLDivElement>, "action"> {
    animateHeight?: boolean | undefined;
    animateTransitions?: boolean | undefined;
    axis?: AxisType | undefined;
    containerStyle?: React.CSSProperties | undefined;
    disabled?: boolean | undefined;
    /*
     * This is the config used to disable lazy loading, if true it will render all the views in first rendering.
     */
    disableLazyLoading?: boolean | undefined;
    enableMouseEvents?: boolean | undefined;
    hysteresis?: number | undefined;
    ignoreNativeScroll?: boolean | undefined;
    index?: number | undefined;
    onChangeIndex?: OnChangeIndexCallback | undefined;
    onSwitching?: OnSwitchingCallback | undefined;
    onTransitionEnd?: OnTransitionEndCallback | undefined;
    resistance?: boolean | undefined;
    style?: React.CSSProperties | undefined;
    slideStyle?: React.CSSProperties | undefined;
    springConfig?: SpringConfig | undefined;
    slideClassName?: string | undefined;
    threshold?: number | undefined;
    action?: ActionCallback;
  }

  export interface SwipeableViewsState {
    indexCurrent?: number | undefined;
    indexLatest?: number | undefined;
    isDragging?: boolean | undefined;
    isFirstRender?: boolean | undefined;
    heightLatest?: number | undefined;
    displaySameSlide?: boolean | undefined;
  }

  export default class SwipeableViews extends React.Component<
    SwipeableViewsProps,
    SwipeableViewsState
  > {}
}
