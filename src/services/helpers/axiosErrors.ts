import { isString } from "@nerdware/ts-type-safety-utils";
import axios, { AxiosError } from "axios";

/**
 * This helper fn returns an {@link AxiosError} using the provided `err` and `fallbackMessage`.
 */
export const getAxiosError = (err: unknown, fallbackMessage: string): AxiosError => {
  return axios.isAxiosError(err) ? err : new AxiosError(fallbackMessage);
};

/**
 * Helper fn for extracting an error message from an AxiosError object.
 */
export const getMessageFromAxiosError = (err: any) => {
  return isString(err?.response?.data?.error)
    ? (err.response.data.error as string)
    : isString(err?.message)
      ? (err.message as string)
      : "An error occurred - please try again later.";
};
