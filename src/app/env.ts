/**
 * This file handles the application's environment variables. An attempt is made
 * to read env vars from the `import.meta.env` object, which is populated by Vite
 * (note: Vite statically replaces env vars at build time, so the full path to
 * each key must be used when reading properties from the `import.meta.env` object).
 *
 * For dev/test environments, default values can be applied to certain env vars.
 * When defaults are applied, a warning is logged to the console.
 */

const MODE = import.meta.env.MODE as "development" | "test" | "staging" | "production";

/** The app's host URI by env/mode (only includes deployed envs). */
const APP_HOSTS_BY_MODE: Partial<Readonly<Record<typeof MODE, string>>> = {
  staging: "staging.gofixit.app",
  production: "gofixit.app",
};

const IS_DEV = import.meta.env.DEV;
const IS_PROD = import.meta.env.PROD;
const IS_STORYBOOK = !!import.meta.env.STORYBOOK;
const PROJECT_VERSION = import.meta.env.VITE_PROJECT_VERSION;
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const APP_PROTOCOL = import.meta.env.VITE_APP_PROTOCOL || "https";
const APP_HOST = import.meta.env.VITE_APP_HOST || (APP_HOSTS_BY_MODE[MODE] ?? "localhost");
const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || "/api";
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const GOOGLE_OAUTH_CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID || "";

// Define the app's origin:
const APP_ORIGIN = `${APP_PROTOCOL}://${APP_HOST}`;

/**
 * Fixit environment variables
 */
export const ENV = {
  MODE,
  IS_DEV,
  IS_PROD,
  IS_STORYBOOK,
  IS_DEPLOYED_ENV: /^(staging|prod)/i.test(MODE),
  PROJECT_VERSION,
  SENTRY_DSN,
  APP_PROTOCOL,
  APP_HOST,
  /** `"[APP_PROTOCOL]://[APP_HOST]"` */
  APP_ORIGIN,
  API_BASE_PATH,
  /** `"[APP_PROTOCOL]://[APP_HOST][API_BASE_PATH]"` */
  API_URI: `${APP_ORIGIN}${API_BASE_PATH}`,
  STRIPE_PUBLISHABLE_KEY,
  GOOGLE_OAUTH_CLIENT_ID,
} as const;
