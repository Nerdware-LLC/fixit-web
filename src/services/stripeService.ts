import { httpService } from "./httpService";
import { logger } from "../utils";
import type { EncodedAuthToken } from "../types";

export const stripeService = {
  submitPaymentForSubscription: async ({
    selectedSubscription,
    promoCode,
    paymentMethodID
  }: {
    selectedSubscription: string;
    paymentMethodID: string;
    promoCode?: string;
  }): Promise<{ token: EncodedAuthToken }> => {
    logger.stripe("submitting payment for subscription...");
    return await httpService.post("/api/subscriptions/submit-payment", {
      selectedSubscription,
      promoCode,
      paymentMethodID
    });
  },
  getCustomerPortalLink: async (): Promise<{ stripeLink: string }> => {
    logger.stripe("fetching customer portal link...");
    return await httpService.get("/api/subscriptions/customer-portal");
  },
  getConnectOnboardingLink: async (): Promise<{ stripeLink: string }> => {
    logger.stripe("fetching connect onboarding account link...");
    return await httpService.get("/api/connect/account-link");
  },
  getConnectDashboardLink: async (): Promise<{ stripeLink: string }> => {
    logger.stripe("fetching connect dashboard link...");
    return await httpService.get("/api/connect/dashboard-link");
  }
};

export type StripeServiceLinkResponse = {
  stripeLink: string;
};
