/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_SENTRY_DSN?: string; // not present for test environment
  VITE_API_PROTOCOL: string;
  VITE_API_HOST: string;
  VITE_STRIPE_PUBLISHABLE_KEY: string;
  VITE_FIXIT_SUB_PROMO_CODES_JSON: string;
}
