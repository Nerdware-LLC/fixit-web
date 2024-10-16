import { authenticatedUserStore } from "@/stores/authenticatedUserStore.js";
import { httpService } from "./httpService.js";
import type { RestApiRequestBodyByPath } from "@/types/open-api.js";

/**
 * This service provides methods for interacting with Stripe-related REST API endpoints.
 *
 * > `@/services` modules contain business logic for interacting with the REST API.
 */
export const stripeService = {
  /**
   * This method is used to check the validity of a user-provided promo code.
   */
  checkPromoCode: async (promoCode: string) => {
    // The response.data is handled in the component that calls this method.
    return await httpService.post("/subscriptions/check-promo-code", { promoCode });
  },
  /**
   * This method is used to submit payment info gathered from the `StripeForm`
   * using the `StripePaymentInput`.
   */
  submitPaymentForSubscription: async ({
    selectedSubscription,
    paymentMethodID,
    promoCode,
  }: RestApiRequestBodyByPath["/subscriptions/submit-payment"]) => {
    const responseData = await httpService.post("/subscriptions/submit-payment", {
      selectedSubscription,
      paymentMethodID,
      promoCode,
    });
    authenticatedUserStore.processAuthToken(responseData.token);
    // response.data.checkoutCompletionInfo is handled in the component that calls this method.
    return responseData;
  },
  /**
   * This method obtains a link to the Stripe-provided customer portal page. Once
   * finished, customers are returned to right where they left off, as determined by
   * the value of `window.location.href` when they clicked the button.
   */
  getCustomerPortalLink: async () => {
    const responseData = await httpService.post("/subscriptions/customer-portal", {
      returnURL: window.location.href,
    });
    window.open(responseData.stripeLink, "_blank");
    return responseData;
  },
  /**
   * This method obtains a link to the Stripe-provided Connect onboarding page. Once
   * finished, customers are returned to right where they left off, as determined by
   * the value of `window.location.href` when they clicked the button.
   */
  getConnectOnboardingLink: async () => {
    const responseData = await httpService.post("/connect/account-link", {
      returnURL: window.location.href,
    });
    window.open(responseData.stripeLink, "_blank");
    return responseData;
  },
  /**
   * This method obtains a link to the Stripe-provided Connect dashboard page.
   */
  getConnectDashboardLink: async () => {
    const responseData = await httpService.get("/connect/dashboard-link");
    window.open(responseData.stripeLink, "_blank");
    return responseData;
  },
};
