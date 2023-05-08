import { httpService } from "./httpService";
import type { UserSubscriptionPriceLabel, EncodedAuthToken } from "@types";

/**
 * Fixit API Stripe-Service Methods
 */
export const stripeService = {
  /**
   * // TODO add jsdoc for stripeService.submitPaymentForSubscription
   */
  submitPaymentForSubscription: async ({
    selectedSubscription,
    promoCode,
    paymentMethodID,
  }: SubmitPaymentForSubscriptionParams): Promise<{ token: EncodedAuthToken }> => {
    return await httpService.post("/api/subscriptions/submit-payment", {
      selectedSubscription,
      promoCode,
      paymentMethodID,
    });
  },

  /**
   * This method obtains a link to the Stripe-provided customer portal page. Once
   * finished, customers are returned to right where they left off, as determined by
   * the value of `window.location.href` when they clicked the button.
   */
  getCustomerPortalLink: async (): Promise<StripeServiceLinkResponse> => {
    return await httpService.post("/api/subscriptions/customer-portal", {
      returnURL: window.location.href,
    });
  },

  /**
   * This method obtains a link to the Stripe-provided Connect onboarding page. Once
   * finished, customers are returned to right where they left off, as determined by
   * the value of `window.location.href` when they clicked the button.
   */
  getConnectOnboardingLink: async (): Promise<StripeServiceLinkResponse> => {
    return await httpService.post("/api/connect/account-link", {
      returnURL: window.location.href,
    });
  },

  /**
   * // TODO add jsdoc for stripeService.getConnectDashboardLink
   */
  getConnectDashboardLink: async (): Promise<StripeServiceLinkResponse> => {
    return await httpService.get("/api/connect/dashboard-link");
  },
};

export type StripeServiceLinkResponse = {
  stripeLink: string;
};

export type SubmitPaymentForSubscriptionParams = {
  selectedSubscription: UserSubscriptionPriceLabel;
  paymentMethodID: string;
  promoCode?: string;
};
