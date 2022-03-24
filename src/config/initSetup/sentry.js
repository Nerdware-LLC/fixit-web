import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { ENV } from "../env";
import { logger } from "../../utils";

Sentry.init({
  dsn: ENV.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  debug: false
});

logger.debug("Sentry has been initialized.");
