import { ENV } from "@/app/env";
import { APP_PATHS } from "./appPaths.js";

/**
 * An object containing commonly-used URLs
 */
export const APP_URLS = {
  /**
   * #### Fixit Web Application Origin
   * `"[APP_PROTOCOL]://[APP_HOST]"` (e.g. `https://gofixit.app`)
   */
  APP_ORIGIN: ENV.APP_ORIGIN,
  /**
   * #### Fixit Privacy Policy URL
   * `"[APP_PROTOCOL]://[APP_HOST]/privacy"` (e.g. `https://gofixit.app/privacy`)
   */
  APP_PRIVACY_POLICY_PAGE: `${ENV.APP_ORIGIN}${APP_PATHS.PRIVACY}`,
  /**
   * #### Fixit Auth'd Home Page URL
   * `"[APP_PROTOCOL]://[APP_HOST]/home"` (e.g. `https://gofixit.app/home`)
   */
  APP_HOME_PAGE: `${ENV.APP_ORIGIN}${APP_PATHS.HOME}`,
  /**
   * #### Fixit Web GitHub Repo README
   * https://github.com/Nerdware-LLC/fixit-web#readme
   */
  REPO: "https://github.com/Nerdware-LLC/fixit-web#readme",
  /**
   * #### Stripe Landing Page
   * https://stripe.com
   */
  STRIPE_LANDING_PAGE: "https://stripe.com",
  /**
   * #### Stripe Pricing Details
   * https://stripe.com/pricing#pricing-details
   */
  STRIPE_PRICING: "https://stripe.com/pricing#pricing-details",
  /**
   * #### Stripe ToS / Stripe Services Agreement (SSA)
   * https://stripe.com/legal/ssa
   */
  STRIPE_SERVICES_AGREEMENT: "https://stripe.com/legal/ssa",
  /**
   * #### Stripe Privacy Policy
   * https://stripe.com/privacy
   */
  STRIPE_PRIVACY_POLICY: "https://stripe.com/privacy",
  /**
   * #### Stripe Connected Account Agreement
   * https://stripe.com/legal/connect-account
   */
  STRIPE_CONNECTED_ACCOUNT_AGREEMENT: "https://stripe.com/legal/connect-account",
} as const satisfies Record<string, string>;
