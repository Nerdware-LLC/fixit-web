import axios from "axios";
import { ENV } from "@config";
import { logger, storage } from "@utils";

axios.defaults.baseURL = ENV.API_BASE_URL;

// Before each REQUEST goes out, do this
axios.interceptors.request.use(
  (config) => {
    config.timeout = 10000;

    const authToken = storage.getAuthToken();

    if (authToken) {
      config.headers = { Authorization: `Bearer ${authToken}` };
    }

    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject({
      message: "Failed to send network request.",
      status: error?.request?.status ?? "STATUS UNKNOWN"
    });
  }
);

// When each RESPONSE comes in, do this
axios.interceptors.response.use(
  (response) => {
    logger.info(`HTTP Response = ${JSON.stringify(response, null, 2)}`);

    if (response?.data?.token) storage.setAuthToken(response.data.token);
    return Promise.resolve(response.data);
  },
  (error) => {
    logger.info(`HTTP ERROR = ${JSON.stringify(error, null, 2)}`);

    if (error?.response?.status === 401) storage.removeAuthToken();
    return Promise.reject({
      message:
        error?.response?.data?.error ?? "An unexpected error occurred - please try again later.",
      status: error?.response?.status ?? 400
    });
  }
);

export const httpService = {
  get: axios.get,
  post: axios.post
};
