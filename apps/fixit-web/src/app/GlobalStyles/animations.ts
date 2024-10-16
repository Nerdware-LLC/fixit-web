import { globalClassNames } from "./classNames.js";
import type { CSSObject } from "@emotion/react";
import type { SetRequired } from "type-fest";

export interface AnimationConfigObject {
  className: string;
  durationMS: number;
  styles: SetRequired<CSSObject, "animation">;
}

/**
 * Internal helper for creating CSS animation config objects.
 */
// prettier-ignore
const makeAnimationCssObject = <T extends string>({
  className, animationName, durationMS, keyframes, timingFn = "ease-in-out",
}: {
  className: string; animationName: T; durationMS: number; keyframes: CSSObject; timingFn?: string;
}): AnimationConfigObject => {
  return {
    className,
    durationMS,
    styles: {
      animation: `${animationName} ${durationMS}ms ${timingFn}`,
      [`@keyframes ${animationName}`]: {
        ...keyframes
      },
    },
  } as const;
};

export const globalAnimations = {
  /**
   * ### **`Wiggle-X Animation`**
   *
   * This object contains fields for implementing the **`Wiggle-X Animation`**:
   *
   * - `duration`: The duration of the animation in milliseconds.
   * - `styles`: The {@link CSSObject} styles which define the animation (provided to `GlobalStyles`).
   * - `className`: The CSS class name for adding the animation to components.
   */
  wiggleX: makeAnimationCssObject({
    className: globalClassNames.animations.wiggleX,
    animationName: "global-wiggle-x",
    durationMS: 350,
    keyframes: {
      "0%": { transform: "translateX(0)" },
      "25%": { transform: "translateX(-15px)" },
      "75%": { transform: "translateX(15px)" },
      "100%": { transform: "translateX(0)" },
    },
  }),
} as const satisfies Record<string, AnimationConfigObject>;
