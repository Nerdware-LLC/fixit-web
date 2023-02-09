import { useFetchStateContext } from "@components";
import { getTypeSafeErr } from "@utils";
import { useAuthToken } from "./useAuthToken";
import { useProcessPreFetchedUserItems } from "./useProcessPreFetchedUserItems";
import type { AuthTokenPayload } from "@types";
import type { AuthServiceToken, PreFetchedUserItems, StripeServiceLinkResponse } from "@services";

/**
 * This hook is used by API-service-related hooks like `useAuthService` and
 * `useStripeService` to provide their methods with common fetch-related logic
 * handling, like triggering loading/error states.
 *
 * For convenience, this hook also provides apiResponseHandler methods via
 * the `checkApiResponse` object; these methods can be called independently,
 * OR provided within an array for the 2nd arg of `handleApiServiceRequest`
 * ("apiResponseHandlers").
 */
export const useApiService = () => {
  const { setIsLoading, setError } = useFetchStateContext();
  const { processAuthToken, removeAuthToken } = useAuthToken();
  const { processPreFetchedUserItems } = useProcessPreFetchedUserItems();

  const checkApiResponse = {
    forAuthToken: async (apiResponse?: Partial<AuthServiceToken>) => {
      return {
        success: !!apiResponse?.token,
        ...(typeof apiResponse?.token === "string" && {
          token: await processAuthToken(apiResponse.token)
        })
      };
    },
    forPrefetchedUserItems: async (
      apiResponse?: { token?: AuthTokenPayload } & Partial<PreFetchedUserItems>
    ) => {
      if (typeof apiResponse?.token?.id === "string" && !!apiResponse?.userItems) {
        await processPreFetchedUserItems(apiResponse.token.id, apiResponse.userItems);
      }
    },
    forStripeLink: (apiResponse?: Partial<StripeServiceLinkResponse>) => {
      if (typeof apiResponse?.stripeLink === "string") {
        window.open(apiResponse.stripeLink);
      }
    }
  };

  const handleApiServiceRequest = async (
    apiServiceMethod: (...args: any[]) => Promise<any>,
    apiResponseHandlers?: Array<(apiResponse?: any) => any | Promise<any>>
  ) => {
    try {
      setIsLoading(true);
      let apiResponse = await apiServiceMethod();
      setIsLoading(false);

      if (Array.isArray(apiResponseHandlers)) {
        for (const apiResponseHandler of apiResponseHandlers) {
          // If handler returns a truthy value, update apiResponse
          const handlerReturnValue = await apiResponseHandler(apiResponse);
          if (handlerReturnValue) apiResponse = handlerReturnValue;
        }
      }

      return apiResponse;
    } catch (err: ErrorLike) {
      setIsLoading(false);
      setError(getTypeSafeErr(err, "Some error occurred, please try again later.").message);
    }
  };

  return {
    handleApiServiceRequest,
    checkApiResponse,
    setIsLoading,
    setError,
    processAuthToken,
    removeAuthToken,
    processPreFetchedUserItems
  };
};
