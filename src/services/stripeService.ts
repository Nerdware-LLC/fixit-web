import { httpService } from "./httpService";
import type { EncodedAuthToken } from "@types";

/**
 * Fixit API Stripe-Service Methods
 *
 * - `submitPaymentForSubscription` — // TODO add jsdoc for stripeService.submitPaymentForSubscription
 *
 * - `getCustomerPortalLink` — This method obtains a link to the Stripe-provided
 *   customer portal page. Once finished, customers are returned right to where
 *   they left off (`window.location.href`).
 *
 * - `getConnectOnboardingLink` — This method obtains a link to the Stripe-provided
 *   Connect onboarding page. Once finished, customers are returned right to where
 *   they left off (`window.location.href`).
 *
 * - `getConnectDashboardLink` — // TODO add jsdoc for stripeService.getConnectDashboardLink
 */
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
    return await httpService.post("/api/subscriptions/submit-payment", {
      selectedSubscription,
      promoCode,
      paymentMethodID
    });
  },
  getCustomerPortalLink: async (): Promise<StripeServiceLinkResponse> => {
    return await httpService.post("/api/subscriptions/customer-portal", {
      returnURL: window.location.href
    });
  },
  getConnectOnboardingLink: async (): Promise<StripeServiceLinkResponse> => {
    return await httpService.post("/api/connect/account-link", {
      returnURL: window.location.href
    });
  },
  getConnectDashboardLink: async (): Promise<StripeServiceLinkResponse> => {
    return await httpService.get("/api/connect/dashboard-link");
  }
};

type StripeServiceLinkResponse = {
  stripeLink: string;
};
