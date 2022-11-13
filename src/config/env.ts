/* Note: Due to create-react-app limitations, we can't set custom
dotenv configs like "path" without some heavy lifting.  */

export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  IS_PROD: process.env.NODE_ENV === "production",
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  STRIPE: {
    PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
    VIP_PROMO_CODE: process.env.REACT_APP_STRIPE_VIP_PROMO_CODE
  }
};
