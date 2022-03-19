import colors from "colors";
import * as Sentry from "@sentry/react";
import { CONFIG } from "../../config";

export const getLogFnFromTemplate = (label, opts) => {
  const { messageColor } = opts ?? { messageColor: colors.white };
  const labelColor = opts?.labelColor ?? messageColor?.bold ?? messageColor;

  const { messageLogFn, errorReportFn, errorLogFn } = CONFIG.IS_PROD_ENV
    ? {
        // prettier-ignore
        messageLogFn: (labelTxt, messageTxt) => Sentry.captureMessage(`${labelTxt} ${messageTxt}`),
        errorReportFn: Sentry.captureException,
        errorLogFn: Sentry.captureMessage
      }
    : {
        // prettier-ignore
        messageLogFn: (labelTxt, messageTxt) => console.log(`${labelColor(labelTxt)} ${messageColor(messageTxt)}`),
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
