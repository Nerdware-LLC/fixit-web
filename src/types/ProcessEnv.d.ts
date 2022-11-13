export {};

declare global {
  namespace NodeJS {
    /**
     * process.env fields (see src/config/env)
     */
    interface ProcessEnv {
      NODE_ENV: "development" | "test" | "ci" | "staging" | "production";
      REACT_APP_SENTRY_DSN: string;
      REACT_APP_API_BASE_URL: string;
      REACT_APP_STRIPE_PUBLISHABLE_KEY: string;
      REACT_APP_STRIPE_VIP_PROMO_CODE: string;
    }
  }
}
