import { isString, getTypeSafeError as _getTypeSafeError } from "@nerdware/ts-type-safety-utils";
import { ENV } from "@/app/env";

/**
 * Internal type-safety util which guarantees the returned object is an `Error`.
 */
export const getTypeSafeError = (
  err: any,
  fallBackErrMsg: string = "An unknown error occurred."
): Error => {
  return isString(err?.response?.data?.error) // test for AxiosErrors first (// TODO handle this elsewhere, rm this util)
    ? new Error(err.response.data.error)
    : _getTypeSafeError(err, {
        fallBackErrMsg,
        shouldStringifyUnknownError: !ENV.IS_PROD && !ENV.IS_TEST,
      });
};
