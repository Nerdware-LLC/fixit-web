require("dotenv").config({ path: "." });

export const CONFIG = {
  IS_PROD_ENV: process.env.NODE_ENV === "production",
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
  STRIPE: {
    PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
    VIP_PROMO_CODE: process.env.REACT_APP_STRIPE_VIP_PROMO_CODE,
    // prettier-ignore
    ROUTES: {
      STRIPE_SUBMIT_PAYMENT_ROUTE: process.env.REACT_APP_STRIPE_SUBMIT_PAYMENT_ROUTE,
      STRIPE_CONNECT_ONBOARDING_ROUTE: process.env.REACT_APP_STRIPE_CONNECT_ONBOARDING_ROUTE
    }
  }
};
