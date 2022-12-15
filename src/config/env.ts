/* Note: Due to create-react-app limitations, we can't set custom
dotenv configs like "path" without some heavy lifting.  */

const {
  NODE_ENV,
  REACT_APP_SENTRY_DSN,
  REACT_APP_API_BASE_URI,
  REACT_APP_API_PROTOCOL,
  REACT_APP_STRIPE_PUBLISHABLE_KEY,
  REACT_APP_FIXIT_SUB_PROMO_CODES_JSON
} = process.env;

export const ENV = {
  NODE_ENV,
  IS_PROD: NODE_ENV === "production",
  SENTRY_DSN: REACT_APP_SENTRY_DSN,
  API_BASE_URL: `${REACT_APP_API_PROTOCOL}://${REACT_APP_API_BASE_URI}`,
  STRIPE: {
    PUBLISHABLE_KEY: REACT_APP_STRIPE_PUBLISHABLE_KEY,
    PROMO_CODES: JSON.parse(REACT_APP_FIXIT_SUB_PROMO_CODES_JSON)
  }
};
