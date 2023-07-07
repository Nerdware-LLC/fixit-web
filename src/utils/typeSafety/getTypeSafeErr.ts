import { ENV } from "@app/env";
import { hasKey } from "./hasKey";
import { safeJsonStringify } from "./safeJsonStringify";

/**
 * Internal type-safety util which guarantees the returned object is an `Error`.
 */
export const getTypeSafeErr = (
  err: unknown,
  fallBackErrMsg: string = "An unknown error occurred."
): Error => {
  return err instanceof Error
    ? err
    : err === null || err === undefined
    ? new Error(fallBackErrMsg)
    : typeof err === "string" && err !== ""
    ? new Error(err)
    : typeof err === "object" &&
      !Array.isArray(err) &&
      hasKey(err, "message") &&
      typeof err.message === "string"
    ? new Error(err.message)
    : new Error(
        `${fallBackErrMsg}${
          ENV.IS_PROD !== true ? `\nOriginal error payload: ${safeJsonStringify(err)}` : ""
        }`
      );
};
