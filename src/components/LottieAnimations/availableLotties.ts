import successLottieJSON from "./success.lottie.json";

export const DEFAULT_LOTTIE_STYLES: Record<string, React.CSSProperties> = {
  centerScreen: {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "20vh",
    marginTop: "-10vh",
    marginLeft: "-10vh"
  }
};

export const DEFAULT_LOTTIE_OPTS = {
  loop: false,
  autoplay: false
};

export const AVAILABLE_LOTTIE_ANIMATIONS = {
  "success-checkmark": {
    animationData: successLottieJSON,
    options: {
      ...DEFAULT_LOTTIE_OPTS,
      duration: 1300
    },
    style: DEFAULT_LOTTIE_STYLES.centerScreen
  }
} as const;
