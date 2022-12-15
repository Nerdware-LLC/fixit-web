import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { logger } from "@utils";
import { ENV } from "../env";

Sentry.init({
  dsn: ENV.SENTRY_DSN,
  integrations: [
    new BrowserTracing({
      tracePropagationTargets: ["localhost", "staging.gofixit.app", "gofixit.app", /^\//]
    })
  ],
  tracesSampleRate: 1.0,
  debug: false
});

logger.info("Sentry has been initialized.");
