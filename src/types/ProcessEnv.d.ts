export {};

declare global {
  namespace NodeJS {
    /**
     * `process.env` fields
     */
    interface ProcessEnv {
      NODE_ENV: "development" | "test" | "ci" | "staging" | "production";
      VITE_SENTRY_DSN: string;
      VITE_FIXIT_SUB_PROMO_CODES_JSON: string;
      VITE_API_PROTOCOL: string;
      VITE_API_HOST: string;
      VITE_STRIPE_PUBLISHABLE_KEY: string;
    }
  }
}
