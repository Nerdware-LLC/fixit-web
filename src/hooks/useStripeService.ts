import { useFetchStateContext } from "@components";
import { getTypeSafeErr } from "@utils";
import { stripeService } from "@services";
import type { EncodedAuthToken } from "@types";

export const useStripeService = () => {
  const { setIsLoading, setError } = useFetchStateContext();

  const stripeFnTemplate = async <Fn extends (...args: any[]) => Promise<any>>(
    asyncStripeFn: Fn,
    args?: Parameters<Fn>[0]
  ) => {
    try {
      setIsLoading(true);
      const stripeSvcResponse = await asyncStripeFn(args);
      setIsLoading(false);
      return stripeSvcResponse;
    } catch (error: ErrorLike) {
      setIsLoading(false);
      setError(getTypeSafeErr(error, "Some error occurred, please try again later.").message);
    }
  };

  return {
    submitPaymentForSubscription: async (
      paymentArgs: Parameters<typeof stripeService.submitPaymentForSubscription>[0]
    ): Promise<{ token: EncodedAuthToken }> => {
      return await stripeFnTemplate(stripeService.submitPaymentForSubscription, paymentArgs);
    },
    getCustomerPortalLink: async (): Promise<void> => {
      const { stripeLink } = await stripeFnTemplate(stripeService.getCustomerPortalLink);
      window.open(stripeLink);
    },
    getConnectOnboardingLink: async (): Promise<void> => {
      const { stripeLink } = await stripeFnTemplate(stripeService.getConnectOnboardingLink);
      window.open(stripeLink);
    },
    getConnectDashboardLink: async (): Promise<void> => {
      const { stripeLink } = await stripeFnTemplate(stripeService.getConnectDashboardLink);
      window.open(stripeLink);
    }
  };
};
