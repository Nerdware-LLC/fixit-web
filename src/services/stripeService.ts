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
    paymentMethodID
  }: {
    selectedSubscription: string;
    promoCode: string;
    paymentMethodID: string;
  }) => {
    logger.stripe("submitting payment for subscription...");
    return await apiService.post(STRIPE_ROUTES.SUBMIT_PAYMENT, {
      selectedSubscription,
      promoCode,
      paymentMethodID
    });
  },
  getConnectOnboardingLink: async () => {
    logger.stripe("fetching connect onboarding account link...");
    return await apiService.get(STRIPE_ROUTES.CONNECT_ONBOARDING);
  }
};
