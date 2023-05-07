import * as Sentry from "@sentry/react";
import dayjs from "dayjs";

export const loggerTemplate = ({
  label,
  message,
  identifier,
}: {
  label: string;
  message: string | Error;
  identifier?: string;
}) => {
  // prettier-ignore
  const labelTxt = `[${dayjs().format("YYYY:MMM:D @k:mm:ss.SS")}][${label}]: ${identifier ? `${identifier} = ` : ""}`;
  if (message instanceof Error) {
    Sentry.captureException(message);
    console.error(`⚠️ ${labelTxt} ${message}`); // eslint-disable-line no-console
  } else {
    // prettier-ignore
    const messageTxt = typeof message === "string" ? message : JSON.stringify(message, null, 2);
    const logStr = `${labelTxt} ${messageTxt}`;
    console.log(logStr); // eslint-disable-line no-console
    // return logStr in case the consuming fn wants to do more with the log output (like send to Sentry)
    return logStr;
  }
};

export const getLogFnFromTemplate = (label: string) => {
  return (message: string | Error, identifier?: string) => {
    loggerTemplate({ label, identifier, message });
  };
};
