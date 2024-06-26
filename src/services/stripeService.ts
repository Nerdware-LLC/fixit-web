import { authenticatedUserStore } from "@/stores/authenticatedUserStore.js";
import { httpService } from "./httpService.js";
import type { RestApiRequestBodyByPath } from "@/types/open-api.js";

export const stripeService = {
  /**
   * This method is used to check the validity of a user-provided promo code.
   */
  checkPromoCode: async (promoCode: string) => {
    return await httpService.post("/subscriptions/check-promo-code", {
      promoCode,
    });
  },

  /**
   * This method is used to submit payment info gathered from the `StripeForm`
   * using the `StripePaymentInput`.
   */
  submitPaymentForSubscription: async ({
    selectedSubscription,
    paymentMethodID,
    promoCode,
  }: SubmitPaymentForSubscriptionParams) => {
    return await httpService.post("/subscriptions/submit-payment", {
      selectedSubscription,
      paymentMethodID,
      promoCode,
    });
  },

  /**
   * This method obtains a link to the Stripe-provided customer portal page. Once
   * finished, customers are returned to right where they left off, as determined by
   * the value of `window.location.href` when they clicked the button.
   */
  getCustomerPortalLink: async () => {
    return await httpService.post("/subscriptions/customer-portal", {
      returnURL: window.location.href,
    });
  },

  /**
   * This method obtains a link to the Stripe-provided Connect onboarding page. Once
   * finished, customers are returned to right where they left off, as determined by
   * the value of `window.location.href` when they clicked the button.
   */
  getConnectOnboardingLink: async () => {
    return await httpService.post("/connect/account-link", {
      returnURL: window.location.href,
    });
  },

  /**
   * This method obtains a link to the Stripe-provided Connect dashboard page.
   */
  getConnectDashboardLink: async () => {
    return await httpService.get("/connect/dashboard-link");
  },
};

export type SubmitPaymentForSubscriptionParams =
  RestApiRequestBodyByPath["/subscriptions/submit-payment"];
