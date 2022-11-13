import { toast } from "react-toastify";
import { useFetchStateContext } from "../components";
import { getTypeSafeErr } from "../utils";
import { stripeService, type StripeServiceLinkResponse } from "../services";
import type { EncodedAuthToken } from "../types";

export const useStripeService = () => {
  const { setIsLoading, setError } = useFetchStateContext();

  const stripeFnTemplate = async <Fn extends AsyncFunction>(
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
      toast(getTypeSafeErr(error, "Some error occurred, please try again later.").message, {
        type: "error"
      });
      setError(getTypeSafeErr(error, "Some error occurred, please try again later.").message);
    }
  };

  return {
    submitPaymentForSubscription: async (
      paymentArgs: Parameters<typeof stripeService.submitPaymentForSubscription>[0]
    ): Promise<{ token: EncodedAuthToken }> => {
      return await stripeFnTemplate(stripeService.submitPaymentForSubscription, paymentArgs);
    },
    getCustomerPortalLink: async (): Promise<StripeServiceLinkResponse> => {
      return await stripeFnTemplate(stripeService.getCustomerPortalLink);
    },
    getConnectOnboardingLink: async (): Promise<StripeServiceLinkResponse> => {
      return await stripeFnTemplate(stripeService.getConnectOnboardingLink);
    },
    getConnectDashboardLink: async (): Promise<StripeServiceLinkResponse> => {
      return await stripeFnTemplate(stripeService.getConnectDashboardLink);
    }
  };
};
