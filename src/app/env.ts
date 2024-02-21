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
const IS_DEV = import.meta.env.DEV;
const IS_PROD = import.meta.env.PROD;
const IS_STORYBOOK = !!import.meta.env?.STORYBOOK;
const PROJECT_VERSION = import.meta.env.VITE_PROJECT_VERSION;
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const API_PROTOCOL = import.meta.env?.VITE_API_PROTOCOL || "https";
const API_HOST = import.meta.env?.VITE_API_HOST || "localhost";
const API_BASE_PATH = import.meta.env?.VITE_API_BASE_PATH || "/api";

// Define the API's origin:
const API_ORIGIN = `${API_PROTOCOL}://${API_HOST}`;

/**
 * Fixit environment variables
 */
export const ENV = {
  MODE,
  IS_DEV,
  IS_TEST: MODE === "test",
  IS_PROD,
  IS_STORYBOOK,
  PROJECT_VERSION,
  SENTRY_DSN,
  API_PROTOCOL,
  API_HOST,
  API_BASE_PATH,
  /** `"[API_PROTOCOL]://[API_HOST]"` */
  API_ORIGIN,
  /** `"[API_PROTOCOL]://[API_HOST][API_BASE_PATH]"` */
  API_URI: `${API_ORIGIN}${API_BASE_PATH}`,
  STRIPE_PUBLISHABLE_KEY,
} as const;
