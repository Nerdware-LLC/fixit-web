/* Note: Due to create-react-app limitations, we can't set custom
dotenv configs like "path" without some heavy lifting.  */

export const ENV = {
  IS_PROD_ENV: process.env.NODE_ENV === "production",
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  ROUTER_PATH_BASE: process.env.REACT_APP_ROUTER_PATH_BASE,
  STRIPE: {
    PUBLISHABLE_KEY: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
    VIP_PROMO_CODE: process.env.REACT_APP_STRIPE_VIP_PROMO_CODE
  }
};
