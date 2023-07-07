import { useLottie as useLottieReact, type LottieOptions } from "lottie-react";
import { AVAILABLE_LOTTIE_ANIMATIONS } from "./availableLotties";

/**
 * Lottie Animations Library: https://lottiefiles.com/featured
 *
 * Package Docs: https://lottiereact.com/hooks/useLottie
 *
 * - If `options.duration` is provided, `playLottie` will return a Promise that
 *   can be awaited; the Promise will resolve after the specified duration in
 *   milliseconds.
 */
export const useLottie = ({ animation, options = {}, style = {} }: UseLottieArgs) => {
  // Merge in animation-specific default options
  options = {
    ...AVAILABLE_LOTTIE_ANIMATIONS[animation].options,
    ...options,
  };

  // Merge in animation-specific default style
  style = {
    ...AVAILABLE_LOTTIE_ANIMATIONS[animation].style,
    ...style,
  };

  // Some fields are renamed for better clarity
  const {
    View: LottieView,
    play: playLottie,
    pause: pauseLottie,
    stop: stopLottie,
    destroy: destroyLottie,
    ...lottieFields
  } = useLottieReact(
    {
      animationData: AVAILABLE_LOTTIE_ANIMATIONS[animation].animationData,
      ...options,
    },
    style
  );

  return {
    LottieView,
    playLottie: !options?.duration
      ? async () => playLottie()
      : async () => {
          await new Promise<void>((resolve) => {
            playLottie();

            setTimeout(() => {
              destroyLottie();
              resolve();
            }, options.duration);
          });
        },
    pauseLottie,
    stopLottie,
    destroyLottie,
    ...lottieFields,
  };
};

export type UseLottieArgs = {
  animation: keyof typeof AVAILABLE_LOTTIE_ANIMATIONS;
  options?: Omit<LottieOptions, "animationData"> & { duration?: number };
  style?: React.CSSProperties;
};
