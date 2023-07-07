import { authenticatedUserStore } from "@cache/authenticatedUserStore";
import { useFetchStateContext } from "@components/Indicators/useFetchStateContext";
import { getTypeSafeErr } from "@utils/typeSafety";
import type { AuthServiceToken } from "@services/authService";

/**
 * This hook is used by API-service-related hooks like `useAuthService` and
 * `useStripeService` to provide their methods with common fetch-related logic
 * handling, like triggering loading/error states.
 */
export const useApiService = () => {
  const { setIsLoading, setError } = useFetchStateContext();

  const checkApiResponseForAuthToken = (apiResponse?: Partial<AuthServiceToken>) => {
    return {
      success: !!apiResponse?.token,
      ...(typeof apiResponse?.token === "string" && {
        token: authenticatedUserStore.processAuthToken(apiResponse.token),
      }),
    };
  };

  const handleApiServiceRequest = async (
    apiServiceMethod: (...args: any[]) => Promise<any>,
    {
      shouldShowRequestLoadingIndicator = true,
      apiResponseHandlers,
    }: {
      shouldShowRequestLoadingIndicator?: boolean;
      apiResponseHandlers?: Array<(apiResponse?: any) => any | Promise<any>>;
    }
  ) => {
    try {
      if (shouldShowRequestLoadingIndicator) setIsLoading(true);
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
    } catch (err: unknown) {
      setIsLoading(false);
      setError(getTypeSafeErr(err, "Some error occurred, please try again later.").message);
    }
  };

  return {
    handleApiServiceRequest,
    checkApiResponseForAuthToken,
    setIsLoading,
    setError,
  };
};
