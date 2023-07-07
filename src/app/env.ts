/**
 * Fixit environment variables
 */
export const ENV: FixitEnvVars = {
  MODE: import.meta.env.MODE as FixitEnvVars["MODE"],
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  API_PROTOCOL: import.meta.env.VITE_API_PROTOCOL,
  API_HOST: import.meta.env.VITE_API_HOST,
  API_ORIGIN: `${import.meta.env.VITE_API_PROTOCOL}://${import.meta.env.VITE_API_HOST}`,
  API_URI: `${import.meta.env.VITE_API_PROTOCOL}://${import.meta.env.VITE_API_HOST}/api`,
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  PROMO_CODES: JSON.parse(import.meta.env.VITE_FIXIT_SUB_PROMO_CODES_JSON),
};

/**
 * Fixit environment variables
 *
 * Related types: `src/types/Process.env.d.ts`
 */
export type FixitEnvVars = Readonly<{
  MODE: "development" | "test" | "staging" | "production";
  IS_DEV: boolean;
  IS_PROD: boolean;
  SENTRY_DSN?: string;
  API_PROTOCOL: string;
  API_HOST: string;
  /** `"[API_PROTOCOL]://[API_HOST]"` */
  API_ORIGIN: string;
  /** `"[API_PROTOCOL]://[API_HOST]/api"` */
  API_URI: string;
  STRIPE_PUBLISHABLE_KEY: string;
  PROMO_CODES: Record<string, number>;
}>;
