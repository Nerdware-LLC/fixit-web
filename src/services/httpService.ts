import { getTypeSafeError } from "@nerdware/ts-type-safety-utils";
import axios, { AxiosError } from "axios";
import { ENV } from "@/app/env";
import { authTokenLocalStorage, authenticatedUserStore } from "@/stores";
import { logger } from "@/utils/logger.js";
import type {
  RestApiRequestBodyByPath,
  RestApiGETendpoint,
  RestApiPOSTendpoint,
  RestApiResponseByPath,
  ErrorResponse,
} from "@/types/open-api.js";

// An `AbortController` instance that can be used to cancel Axios requests
const axiosAbortController = new AbortController();

// Axios defaults:
axios.defaults.baseURL = ENV.API_URI;
axios.defaults.signal = axiosAbortController.signal;
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = ENV.IS_DEPLOYED_ENV;

// Before each REQUEST goes out, do this:
axios.interceptors.request.use(
  (config) => {
    // Add 'Authorization' header if an authToken is present
    const authToken = authTokenLocalStorage.get();

    if (authToken) config.headers.Authorization = `Bearer ${authToken}`;

    return Promise.resolve(config);
  },
  (error: unknown) => {
    return Promise.reject(
      axios.isAxiosError(error) ? error : new AxiosError("Failed to send network request.")
    );
  }
);

// When each RESPONSE comes in, do this:
axios.interceptors.response.use(
  // If the response is successful, return the response as-is:
  (response) => response,
  // If the response is an error, handle the error:
  async (error: AxiosError<ErrorResponse>) => {
    // If `error` is not an AxiosError, reject with a generic error message:
    if (!axios.isAxiosError(error))
      return Promise.reject(
        getTypeSafeError(error, {
          fallBackErrMsg: "An error occurred - please try again later.",
          shouldStringifyUnknownError: ENV.IS_DEV,
        })
      );

    // Check for any available info about the error:
    const {
      code: axiosErrorCode,
      message: axiosErrorMsg,
      response: {
        status: httpErrorStatusCode,
        data: apiErrorResponse
      } = {},
    } = error; // prettier-ignore

    // Handle aborted requests:
    if (axiosErrorCode === "ERR_CANCELED") return Promise.resolve({ status: 499 });

    // Handle timeouts / network errors:
    if (axiosErrorMsg.includes("timeout"))
      return Promise.reject(new Error("A network error occurred - please try again later."));

    // Check the error status code:
    if (httpErrorStatusCode) {
      if (httpErrorStatusCode === 401) authenticatedUserStore.deauthenticate();
      else if (httpErrorStatusCode >= 500) logger.error(error, "HTTP_SERVICE_CODE_5xx");
    } else {
      logger.error(error, "HTTP_SERVICE_CODE_UNKNOWN");
    }

    return Promise.reject(
      new Error(
        apiErrorResponse?.error ??
          (ENV.IS_PROD ? "An error occurred - please try again." : axiosErrorMsg)
      )
    );
  }
);

export const httpService = {
  get: async <GETendpoint extends RestApiGETendpoint>(endpoint: GETendpoint) => {
    const response = await axios.get<RestApiResponseByPath[GETendpoint]>(endpoint);
    return response.data;
  },

  post: async <POSTendpoint extends RestApiPOSTendpoint>(
    endpoint: POSTendpoint,
    data?: RestApiRequestBodyByPath[POSTendpoint]
  ) => {
    const response = await axios.post<RestApiResponseByPath[POSTendpoint]>(endpoint, data);
    return response.data;
  },

  /** Abort all pending Axios requests using the `AbortController` instance's `abort` method. */
  abortRequests: () => axiosAbortController.abort(),
} as const;
