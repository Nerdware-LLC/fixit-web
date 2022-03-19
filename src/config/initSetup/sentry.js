import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { CONFIG } from "../config";
import { logger } from "../../utils";

Sentry.init({
  dsn: CONFIG.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  debug: false
});

logger.debug("Sentry has been initialized.");
