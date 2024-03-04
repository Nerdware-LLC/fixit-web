import { useEffect } from "react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import * as Sentry from "@sentry/react";
import { ENV } from "@/app/env";

if (/^(dev|staging|prod)/i.test(ENV.MODE) && !ENV.IS_STORYBOOK && !!ENV?.SENTRY_DSN) {
  Sentry.init({
    enabled: true,
    dsn: ENV.SENTRY_DSN,
    environment: ENV.MODE,
    integrations: [
      // Routing integration: React Router v6
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ["localhost", /^https:\/\/(www\.)?((demo|staging)\.)?gofixit.app/],
    debug: false,
  });
}
