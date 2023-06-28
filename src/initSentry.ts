import { useEffect } from "react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import * as Sentry from "@sentry/react";
import { ENV } from "@app/env";
import { logger } from "@utils/logger";

Sentry.init({
  dsn: ENV.SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", "staging.gofixit.app", "gofixit.app", /^\//],
      // Routing integration: React Router v6
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
  ],
  tracesSampleRate: 1.0,
  debug: false,
});

logger.info("Sentry has been initialized.");
