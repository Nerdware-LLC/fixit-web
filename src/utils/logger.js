import * as Sentry from "@sentry/react";
import { ENV } from "../config";

// Fn which returns env-appropriate log fn with desired label.
const getLogFnFromTemplate = (label, opts) => {
  const { messageLogFn, errorReportFn, errorLogFn } = ENV.IS_PROD_ENV
    ? {
        // prettier-ignore
        messageLogFn: (labelTxt, messageTxt) => Sentry.captureMessage(`${labelTxt} ${messageTxt}`),
        errorReportFn: Sentry.captureException,
        errorLogFn: Sentry.captureMessage
      }
    : {
        // prettier-ignore
        messageLogFn: (labelTxt, messageTxt) => console.log(`${labelTxt} ${messageTxt}`),
        errorReportFn: console.error,
        errorLogFn: console.error
      };

  return (message, identifier) => {
    const labelTxt = `[${label}]: ${identifier ? `${identifier} = ` : ""}`;
    if (message instanceof Error) {
      errorReportFn(message);
      errorLogFn(`⚠️ ${labelTxt} ${message}`);
    } else {
      // prettier-ignore
      const messageTxt = typeof message === "string" ? message : JSON.stringify(message, null, 2);
      messageLogFn(labelTxt, messageTxt);
    }
  };
};

export const logger = {
  debug: getLogFnFromTemplate("DEBUG"),
  info: getLogFnFromTemplate("INFO"),
  error: getLogFnFromTemplate("ERROR"),
  stripe: getLogFnFromTemplate("STRIPE")
};
