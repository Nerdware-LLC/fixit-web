import { useLottie } from "./useLottie";
import successLottieJSON from "./success.lottie.json";
import { commonLottieStyles } from "./commonLottieStyles";

/**
 * `useSuccessLottie` provides common styling and await-able duration
 * for the green-checkmark-success lottie animation.
 */
export const useSuccessLottie = ({ style = {} }: { style?: React.CSSProperties } = {}) => {
  return useLottie({
    animation: successLottieJSON,
    options: {
      duration: 1300
    },
    style: {
      ...commonLottieStyles.centerScreen,
      ...style
    }
  });
};
