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
    ],
    tracesSampleRate: 0.5,
    tracePropagationTargets: ["localhost", /^https:\/\/(www\.)?((demo|staging)\.)?gofixit.app/],
    ...(/^(staging|prod)/i.test(ENV.MODE) && {
      tunnel: "/sentry-proxy",
    }),
  });
}
