import { safeJsonStringify, getErrorMessage, isError } from "@nerdware/ts-type-safety-utils";
import * as Sentry from "@sentry/react";
import dayjs from "dayjs";
import { ENV } from "@/app/env";

/* eslint-disable no-console */

/**
 * - In PROD, timestamp is formatted to always be the same length to accomodate bulk log parsing.
 *   - _example:_ `"2020:Jan:01 01:01:01.123"`
 * - In NON-PROD, timestamp format is designed to be easier to read at a glance in the console.
 *   - _example:_ `"2020:Jan:1 1:01:01.123"`
 */
const LOG_TIMESTAMP_FORMAT = ENV.IS_PROD ? "YYYY:MMM:DD HH:mm:ss.SSS" : "YYYY:MMM:D H:mm:ss.SSS";

/**
 * Returns a log-message string — format: `"[<timestamp>][<label>] <messagePrefix?> <message>"`
 * @see {@link LOG_TIMESTAMP_FORMAT}
 */
const getLogMessage = ({
  label,
  input,
  messagePrefix = "",
}: GetLogMessageArgsProvidedByLoggerUtil & GetLogMessageArgsProvidedByHandler): string => {
  let message = `[${dayjs().format(LOG_TIMESTAMP_FORMAT)}][${label}]`;

  if (messagePrefix) message += ` ${messagePrefix}`;

  message += getErrorMessage(input) || safeJsonStringify(input);

  return message;
};

/**
 * This function returns a logging function suited for the operating environment:
 *
 * - IN PRODUCTION:
 *   - Error logs are always sent to Sentry
 *   - Non-error logs:
 *     - Sent to Sentry if `isEnabledInProduction` is `true`
 *     - Ignored if `isEnabledInProduction` is `false`
 *
 * - IN NON-PRODUCTION ENVS:
 *   - Error logs are always logged using `console.error`
 *
 * > Errors are always logged in all environments regardless of
 *   `isEnabledInProduction` which only applies to non-error logs.
 */
const getLoggerUtil = ({
  label,
  isEnabledInProduction = false,
  nonProdConsoleMethod = console.log,
}: GetLogMessageArgsProvidedByLoggerUtil & {
  /** Bool flag to enable logging non-errors in prod. */
  isEnabledInProduction?: boolean;
  /** The `console` method to use (default: `console.log`). */
  nonProdConsoleMethod?:
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
  }: Record<"handleLogMessage" | "handleLogError", LoggerFn> = ENV.IS_PROD
    ? {
        handleLogError: (input, messagePrefix) => {
          Sentry.captureException(input);
          Sentry.captureMessage(getLogMessage({ label, input, messagePrefix }));
        },
        handleLogMessage: isEnabledInProduction
          ? (input, messagePrefix) => {
              Sentry.captureMessage(getLogMessage({ label, input, messagePrefix }));
            }
          : () => {
              // No-op if not enabled in production
            },
      }
    : {
        handleLogError: (input, messagePrefix) => {
          console.error(getLogMessage({ label, input, messagePrefix }), input);
        },
        handleLogMessage: (input, messagePrefix) => {
          nonProdConsoleMethod(getLogMessage({ label, input, messagePrefix }));
        },
      };

  // The returned fn simply checks if input is an Error, and calls handleLogMessage/handleLogError accordingly
  return (input, messagePrefix) => {
    if (isError(input)) handleLogError(input, messagePrefix);
    else handleLogMessage(input, messagePrefix);
  };
};

export const logger = {
  info: getLoggerUtil({
    label: "INFO",
    nonProdConsoleMethod: console.info,
  }),
  error: getLoggerUtil({
    label: "ERROR",
    nonProdConsoleMethod: console.error,
    isEnabledInProduction: true,
  }),
  gqlInfo: getLoggerUtil({
    label: "GQL",
    nonProdConsoleMethod: console.info,
  }),
  gqlError: getLoggerUtil({
    label: "GQL-ERROR",
    nonProdConsoleMethod: console.error,
    isEnabledInProduction: true,
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
  messagePrefix?: string | undefined;
};

/** This type reflects the structure of the function returned by `getLoggerUtil`. */
type LoggerFn = (
  input: GetLogMessageArgsProvidedByHandler["input"],
  messagePrefix?: GetLogMessageArgsProvidedByHandler["messagePrefix"]
) => void;
