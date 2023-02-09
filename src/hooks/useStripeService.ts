import { stripeService } from "@services";
import { useApiService } from "./useApiService";

export const useStripeService = () => {
  const { handleApiServiceRequest, checkApiResponse } = useApiService();

  return {
    submitPaymentForSubscription: async (
      paymentArgs: Parameters<typeof stripeService.submitPaymentForSubscription>[0]
    ): Promise<{ success: boolean }> => {
      return await handleApiServiceRequest(
        async () => stripeService.submitPaymentForSubscription(paymentArgs),
        [checkApiResponse.forAuthToken]
      );
    },
    getCustomerPortalLink: async () => {
      await handleApiServiceRequest(stripeService.getCustomerPortalLink, [
        checkApiResponse.forStripeLink
      ]);
    },
    getConnectOnboardingLink: async () => {
      await handleApiServiceRequest(stripeService.getConnectOnboardingLink, [
        checkApiResponse.forStripeLink
      ]);
    },
    getConnectDashboardLink: async () => {
      await handleApiServiceRequest(stripeService.getConnectDashboardLink, [
        checkApiResponse.forStripeLink
      ]);
    }
  };
};
