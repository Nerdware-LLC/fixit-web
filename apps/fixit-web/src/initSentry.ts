import { useEffect } from "react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import * as Sentry from "@sentry/react";
import { ENV } from "@/app/env";

if (/^(dev|staging|prod)/i.test(ENV.MODE) && !ENV.IS_STORYBOOK && !!ENV.SENTRY_DSN) {
  Sentry.init({
    enabled: true,
    dsn: ENV.SENTRY_DSN,
    environment: ENV.MODE,
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.replayIntegration(),
    ],
    tracePropagationTargets: [
      ENV.IS_DEPLOYED_ENV ? /^https:\/\/(www\.)?((demo|staging)\.)?gofixit.app/ : /localhost/,
    ],
    tracesSampleRate: 0.5,
    replaysSessionSampleRate: 0.1, // Capture Replay for 10% of all sessions
    replaysOnErrorSampleRate: 1.0, // Capture Replay for 100% of sessions with an error
    ...(ENV.IS_DEPLOYED_ENV && {
      tunnel: "/sentry-proxy",
    }),
  });
}
