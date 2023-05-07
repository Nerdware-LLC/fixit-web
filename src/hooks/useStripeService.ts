import { stripeService, StripeServiceLinkResponse } from "@services/stripeService";
import { useApiService } from "./useApiService";
import type { SubmitPaymentForSubscriptionParams } from "@services/stripeService";

export const useStripeService = () => {
  const { handleApiServiceRequest, checkApiResponseForAuthToken } = useApiService();

  const checkApiResponseForStripeLink = (apiResponse?: Partial<StripeServiceLinkResponse>) => {
    if (typeof apiResponse?.stripeLink === "string") {
      window.open(apiResponse.stripeLink);
    }
  };

  return {
    submitPaymentForSubscription: async (
      paymentArgs: SubmitPaymentForSubscriptionParams
    ): Promise<{ success: boolean }> => {
      return await handleApiServiceRequest(
        async () => stripeService.submitPaymentForSubscription(paymentArgs),
        {
          apiResponseHandlers: [checkApiResponseForAuthToken],
        }
      );
    },
    getCustomerPortalLink: async () => {
      await handleApiServiceRequest(stripeService.getCustomerPortalLink, {
        apiResponseHandlers: [checkApiResponseForStripeLink],
      });
    },
    getConnectOnboardingLink: async () => {
      await handleApiServiceRequest(stripeService.getConnectOnboardingLink, {
        apiResponseHandlers: [checkApiResponseForAuthToken],
      });
    },
    getConnectDashboardLink: async () => {
      await handleApiServiceRequest(stripeService.getConnectDashboardLink, {
        apiResponseHandlers: [checkApiResponseForAuthToken],
      });
    },
  };
};
