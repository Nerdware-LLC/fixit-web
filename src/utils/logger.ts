import {
  safeJsonStringify,
  getErrorMessage,
  isError,
  isSafeInteger,
} from "@nerdware/ts-type-safety-utils";
import * as Sentry from "@sentry/react";
import axios from "axios";
import dayjs from "dayjs";
import { ENV } from "@/app/env";
import type { AxiosError } from "axios";

/* eslint-disable no-console */

/**
 * Returns a log message string.
 * - Log message format: `"[<timestamp>][<label>] <msgPrefix?> <message>"`
 */
const getLogMessage = ({
  label,
  input,
  msgPrefix = "",
}: GetLogMessageArgsProvidedByLoggerUtil & GetLogMessageArgsProvidedByHandler): string => {
  let message = `[${dayjs().format("YYYY:MMM:D H:mm:ss.SSS")}][${label}]`;

  if (msgPrefix) message += ` ${msgPrefix}`;

  message += getErrorMessage(input) || safeJsonStringify(input);

  return message;
};

/**
 * This function returns a logging function suited for the operating environment:
 *
 * - IN DEPLOYED ENVS (PRODUCTION/STAGING):
 *   - Error logs are always sent to Sentry
 *   - Non-error logs:
 *     - Sent to Sentry if `isEnabledInDeployedEnvs` is `true`
 *     - Ignored if `isEnabledInDeployedEnvs` is `false`
 *
 * - IN NON-PRODUCTION ENVS:
 *   - Error logs are always logged using `console.error`
 *   - Non-error logs are colorized and logged using `consoleMethod`
 *
 * > Errors are always logged in all environments regardless of
 *   `isEnabledInDeployedEnvs` which only applies to non-error logs.
 */
const getLoggerUtil = ({
  label,
  isEnabledInDeployedEnvs = false,
  consoleMethod = console.log,
}: GetLogMessageArgsProvidedByLoggerUtil & {
  /** Bool flag to enable logging non-errors in deployed envs: staging, prod */
  isEnabledInDeployedEnvs?: boolean;
  /** The `console` method to use (default: `console.log`). */
  consoleMethod?:
    | typeof console.log
    | typeof console.info
    | typeof console.debug
    | typeof console.warn
    | typeof console.error;
}): LoggerFn => {
  // `handleLogMessage` and `handleLogError` are env-dependent and govern where/how logs are sent
  const {
    handleLogMessage,
    handleLogError,
  }: { handleLogError: ErrorLoggerFn; handleLogMessage: LoggerFn } = ENV.IS_DEPLOYED_ENV
    ? {
        handleLogError: (error, msgPrefix) => {
          // Check for possible http err status — if exists and under 500 in PROD, don't send to Sentry.
          const maybeHttpErrStatusCode =
            error?.status ?? error?.statusCode ?? error?.response?.status;

          if (isSafeInteger(maybeHttpErrStatusCode) && maybeHttpErrStatusCode < 500 && ENV.IS_PROD)
            return;

          Sentry.captureException(error);
          Sentry.captureMessage(getLogMessage({ label, input: error, msgPrefix }));
        },
        handleLogMessage: isEnabledInDeployedEnvs
          ? (input, msgPrefix) => {
              Sentry.captureMessage(getLogMessage({ label, input, msgPrefix }));
            }
          : () => {
              // No-op if not enabled in production
            },
      }
    : {
        handleLogError: (error, msgPrefix) => {
          console.error(getLogMessage({ label, input: error, msgPrefix }), error);
        },
        handleLogMessage: (input, msgPrefix) => {
          consoleMethod(getLogMessage({ label, input, msgPrefix }));
        },
      };

  // The returned fn simply checks if input is an Error, and calls handleLogMessage/handleLogError accordingly
  return (input, msgPrefix) => {
    if (isError(input) || axios.isAxiosError(input)) {
      handleLogError(input, msgPrefix);
    } else {
      handleLogMessage(input, msgPrefix);
    }
  };
};

export const logger = {
  info: getLoggerUtil({
    label: "INFO",
    consoleMethod: console.info,
  }),
  error: getLoggerUtil({
    label: "ERROR",
    consoleMethod: console.error,
    isEnabledInDeployedEnvs: true,
  }),
  gqlInfo: getLoggerUtil({
    label: "GQL",
    consoleMethod: console.info,
  }),
  gqlError: getLoggerUtil({
    label: "GQL-ERROR",
    consoleMethod: console.error,
    isEnabledInDeployedEnvs: true,
  }),
};

/** Args provided to `getLogMessage` by `getLoggerUtil`. */
type GetLogMessageArgsProvidedByLoggerUtil = {
  /** A purpose-related label used to differentiate log sources. */
  label: string;
};

/** Args provided to `getLogMessage` by `LoggerFn` invocations. */
type GetLogMessageArgsProvidedByHandler = {
  /** The raw input provided to a logger function. */
  input: unknown;
  /** An optional string to prefix the stringified log `input`. */
  msgPrefix?: string | undefined;
};

/** This type reflects the structure of the function returned by `getLoggerUtil`. */
type LoggerFn = (
  input: GetLogMessageArgsProvidedByHandler["input"],
  msgPrefix?: GetLogMessageArgsProvidedByHandler["msgPrefix"]
) => void;

/** Internal type for `handleLogError` fns used in `getLoggerUtil`. */
type ErrorLoggerFn = (
  error: Error & Partial<Omit<AxiosError, "cause">> & { statusCode?: number },
  msgPrefix?: GetLogMessageArgsProvidedByHandler["msgPrefix"]
) => void;
