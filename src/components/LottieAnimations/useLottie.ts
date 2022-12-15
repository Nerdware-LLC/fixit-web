import { useLottie as useLottieReact, type LottieOptions } from "lottie-react";

/**
 * Lottie Animations Library: https://lottiefiles.com/featured
 *
 * Package Docs: https://lottiereact.com/hooks/useLottie
 *
 * - If `options.duration` is provided, `playLottie` will return a Promise that
 *   can be awaited; the Promise will resolve after the specified duration in
 *   milliseconds.
 */
export const useLottie = ({
  animation,
  options = DEFAULT_LOTTIE_OPTS,
  style = {}
}: {
  animation: unknown;
  options?: Omit<LottieOptions, "animationData"> & { duration?: number };
  style?: React.CSSProperties;
}) => {
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
      animationData: animation,
      ...DEFAULT_LOTTIE_OPTS,
      ...options
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
    ...lottieFields
  };
};

const DEFAULT_LOTTIE_OPTS = {
  loop: false,
  autoplay: false
};
