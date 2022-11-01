import axios from "axios";
import { ENV } from "../config";
import { storage } from "../utils";

axios.defaults.baseURL = ENV.API_BASE_URL;

// Before each REQUEST goes out, do this
axios.interceptors.request.use(
  (config) => {
    config.timeout = 10000;

    const authToken = storage.getAuthToken();
    config.headers = { Authorization: `Bearer ${authToken}` };

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
    if (response?.data?.token) storage.setAuthToken(response.data.token);
    return Promise.resolve(response.data);
  },
  (error) => {
    if (error.response.status === 401) storage.removeAuthToken();
    return Promise.reject({
      message: error.response.data.error,
      status: error.response.status
    });
  }
);

export const apiService = {
  get: axios.get,
  post: axios.post
};
