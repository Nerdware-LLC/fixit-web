import { apiService } from "./apiService";
import { CONFIG } from "../config";
import { logger } from "../utils";

const {
  STRIPE_SUBMIT_PAYMENT_ROUTE,
  STRIPE_CONNECT_ONBOARDING_ROUTE
} = CONFIG.STRIPE.ROUTES;

export const stripeService = {
  submitPaymentForSubscription: async ({
    selectedSubscription,
    promoCode,
    paymentMethod_id
  }) => {
    logger.stripe("submitting payment for subscription...");
    return await apiService.post(STRIPE_SUBMIT_PAYMENT_ROUTE, {
      selectedSubscription,
      promoCode,
      paymentMethod_id
    });
  },
  getConnectOnboardingLink: async () => {
    logger.stripe("fetching connect onboarding account link...");
    return await apiService.get(STRIPE_CONNECT_ONBOARDING_ROUTE);
  }
};
