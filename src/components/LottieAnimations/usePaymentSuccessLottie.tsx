import { useLottie } from "./useLottie";
import paymentSuccessfulLottieJSON from "./payment-successful.lottie.json";
import { commonLottieStyles } from "./commonLottieStyles";

/**
 * `useSuccessLottie` provides common styling and await-able duration
 * for the green-checkmark-payment-successful lottie animation.
 */
export const usePaymentSuccessLottie = ({ style = {} }: { style?: React.CSSProperties } = {}) => {
  return useLottie({
    animation: paymentSuccessfulLottieJSON,
    options: {
      duration: 1300
    },
    style: {
      ...commonLottieStyles.centerScreen,
      ...style
    }
  });
};
