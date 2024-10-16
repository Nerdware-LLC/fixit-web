import "./initSentry.js";
import { StrictMode as ReactStrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { App } from "@/app";

const root = createRoot(document.getElementById("root")!, {
  // TODO When react 19 is released, add Sentry to new root error-handler opts.
  // See https://docs.sentry.io/platforms/javascript/guides/react/#react-19-error-reporting
  onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
  <ReactStrictMode>
    <App />
  </ReactStrictMode>
);
