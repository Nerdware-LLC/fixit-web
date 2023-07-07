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
  enabled: ENV.MODE !== "test",
  dsn: ENV.SENTRY_DSN,
  environment: ENV.MODE,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [
        ENV.API_HOST.split(":")[0], // if API_HOST contains port, only use the hostname
        /^\//,
      ],
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
