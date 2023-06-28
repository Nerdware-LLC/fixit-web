/* eslint-disable no-console */
import * as Sentry from "@sentry/react";
import dayjs from "dayjs";
import { ENV } from "@app/env";
import { safeJsonStringify } from "@utils/typeSafety";

/**
 * Returns a log-message string.
 * - Format: `"[<timestamp>][<label>] <messagePrefix?> <message>"`
 * - Timestamp format: `"YYYY:MMM:D k:mm:ss.SSS"`
 */
const getLogMessage = ({
  label,
  input,
  messagePrefix = "",
}: GetLogMessageArgsProvidedByLoggerUtil & GetLogMessageArgsProvidedByHandler): string => {
  let message = `[${dayjs().format("YYYY:MMM:D @k:mm:ss.SSS")}][${label}]`;

  if (messagePrefix) message += ` ${messagePrefix}`;

  message +=
    input instanceof Error
      ? input.message
      : typeof input === "string"
      ? input
      : safeJsonStringify(input);

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
  }: Record<"handleLogMessage" | "handleLogError", LoggerFn> =
    ENV.IS_PROD === true
      ? {
          handleLogError: (input, messagePrefix) => {
            Sentry.captureException(input);
            Sentry.captureMessage(getLogMessage({ label, input, messagePrefix }));
          },
          handleLogMessage:
            isEnabledInProduction === true
              ? (input, messagePrefix) => {
                  Sentry.captureMessage(getLogMessage({ label, input, messagePrefix }));
                }
              : () => {},
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
    if (input instanceof Error) handleLogError(input, messagePrefix);
    else handleLogMessage(input, messagePrefix);
  };
};

export const logger = {
  auth: getLoggerUtil({
    label: "AUTH",
  }),
  stripe: getLoggerUtil({
    label: "STRIPE",
  }),
  debug: getLoggerUtil({
    label: "DEBUG",
    nonProdConsoleMethod: console.debug,
  }),
  info: getLoggerUtil({
    label: "INFO",
    nonProdConsoleMethod: console.info,
  }),
  error: getLoggerUtil({
    label: "ERROR",
    nonProdConsoleMethod: console.error,
    isEnabledInProduction: true,
  }),
  gql: getLoggerUtil({
    label: "GQL",
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
