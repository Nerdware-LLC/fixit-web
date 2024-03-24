import { isString } from "@nerdware/ts-type-safety-utils";
import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
} from "axios";
import { ENV } from "@/app/env";
import { authTokenLocalStorage, authenticatedUserStore } from "@/stores";
import { logger } from "@/utils/logger";
import {
  abortController,
  cachePreFetchedUserItems,
  getAxiosError,
  getMessageFromAxiosError,
} from "./helpers";
import type {
  RestApiRequestBodyByPath,
  RestApiPOST200ResponseByPath,
  RestApiGETendpoint,
  RestApiGET200ResponseByPath,
  OpenApiSchemas,
} from "@/types/open-api";

// Axios defaults:
axios.defaults.baseURL = ENV.API_URI;
axios.defaults.signal = abortController.signal;
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = ENV.IS_DEPLOYED_ENV;

// Before each REQUEST goes out, do this:
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add 'Authorization' header if an authToken is present
    const authToken = authTokenLocalStorage.get();

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return Promise.resolve(config);
  },
  (error: unknown) => Promise.reject(getAxiosError(error, "Failed to send network request."))
);

// When each RESPONSE comes in, do this:
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // If the API response contains a new auth token, process it
    if (response?.data?.token) {
      const tokenPayload = authenticatedUserStore.processAuthToken(response.data.token);

      // Check for pre-fetched user items, write to apollo cache if present
      if (isString(tokenPayload?.id) && response?.data?.userItems) {
        cachePreFetchedUserItems(tokenPayload.id, response.data.userItems);
      }
    }

    // If the API response contains a Stripe-related link, open it (API uses key "stripeLink")
    if (response?.data?.stripeLink) {
      window.open(response.data.stripeLink, "_blank");
    }

    return Promise.resolve(response.data);
  },
  async (error: AxiosError<OpenApiSchemas["Error"]>) => {
    // Check if req was aborted:
    if (error.code === "ERR_CANCELED") return Promise.resolve({ status: 499 });

    // Check the error status code:
    const errorStatusCode = error?.response?.status;

    if (errorStatusCode) {
      if (errorStatusCode === 401) authenticatedUserStore.deauthenticate();
      else if (errorStatusCode >= 500) logger.error(error, "HTTP_SERVICE_CODE_5xx");
    } else {
      logger.error(error, "HTTP_SERVICE_CODE_UNKNOWN");
    }

    return Promise.reject(getAxiosError(error, getMessageFromAxiosError(error)));
  }
);

export const httpService = {
  get: axios.get.bind(axios) as <GETendpoint extends RestApiGETendpoint>(
    url: GETendpoint,
    config?: AxiosRequestConfig
  ) => Promise<RestApiGET200ResponseByPath[GETendpoint]>,

  post: axios.post.bind(axios) as <POSTendpoint extends keyof RestApiRequestBodyByPath>(
    url: POSTendpoint,
    data?: RestApiRequestBodyByPath[POSTendpoint],
    config?: AxiosRequestConfig
  ) => Promise<RestApiPOST200ResponseByPath[POSTendpoint]>,

  /**
   * Abort all pending HTTP requests using the `AbortController` instance's `abort` method.
   */
  abortRequests: () => abortController.abort(),
} as const;
