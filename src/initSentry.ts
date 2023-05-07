import { useEffect } from "react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import * as Sentry from "@sentry/react";
import { logger } from "@utils/logger";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", "staging.gofixit.app", "gofixit.app", /^\//],
      /*
        Sentry routingInstrumentation docs:
        https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/#usage-with-react-router-64-data-api
      */
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
