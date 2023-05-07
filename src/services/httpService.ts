import axios from "axios";
import { logger } from "@utils/logger";
import { storage } from "@utils/storage";

axios.defaults.baseURL = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_BASE_URI}`;

// Before each REQUEST goes out, do this
axios.interceptors.request.use(
  (config) => {
    config.timeout = 10000;

    const authToken = storage.authToken.get();

    if (authToken) {
      config.headers = { Authorization: `Bearer ${authToken}` };
    }

    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject({
      message: "Failed to send network request.",
      status: error?.request?.status ?? "STATUS UNKNOWN",
    });
  }
);

// When each RESPONSE comes in, do this
axios.interceptors.response.use(
  (response) => {
    if (response?.data?.token) storage.authToken.set(response.data.token);
    return Promise.resolve(response.data);
  },
  (error) => {
    logger.error(`ERROR: ${JSON.stringify(error, null, 2)}`, "HTTP_SERVICE");

    if (error?.response?.status === 401) storage.authToken.remove();
    return Promise.reject({
      message: error?.response?.data?.error ?? "An unexpected error occurred - please try again later.", // prettier-ignore
      status: error?.response?.status ?? 400,
    });
  }
);

export const httpService = {
  get: axios.get,
  post: axios.post,
};
