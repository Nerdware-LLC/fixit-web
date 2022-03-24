import { apiService } from "./apiService";
import { logger } from "../utils";

const STRIPE_ROUTES = {
  SUBMIT_PAYMENT: "/subscriptions/submit-payment",
  CONNECT_ONBOARDING: "/connect/account-link"
};

export const stripeService = {
  submitPaymentForSubscription: async ({
    selectedSubscription,
    promoCode,
    paymentMethod_id
  }) => {
    logger.stripe("submitting payment for subscription...");
    return await apiService.post(STRIPE_ROUTES.SUBMIT_PAYMENT, {
      selectedSubscription,
      promoCode,
      paymentMethod_id
    });
  },
  getConnectOnboardingLink: async () => {
    logger.stripe("fetching connect onboarding account link...");
    return await apiService.get(STRIPE_ROUTES.CONNECT_ONBOARDING);
  }
};
