import type { SubscriptionStatus, SubscriptionPriceName } from "@/types/graphql.js";

export const USER_SUBSCRIPTION_STATUSES = [
  "active",
  "trialing",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "canceled",
  "unpaid",
] as const satisfies ReadonlyArray<SubscriptionStatus>;

/**
 * > `The values used here are for DISPLAY PURPOSES ONLY and merely convey
 *   information to the user. All pricing/product info is stored and calculated
 *   by the backend API. Sending invalid pricing/product info to the server
 *   results a 400 response.`
 */
export const SUB_PRICING_DISPLAY_CONFIGS = {
  TRIAL: {
    prettyName: "Free Trial",
    label: "Try Fixit",
    price: 0,
    isTrial: true,
    trialDays: 14,
    afterTrial: {
      price: 500,
      billingPeriod: "month",
    },
  },
  MONTHLY: {
    prettyName: "Monthly",
    label: "Monthly Subscription",
    price: 500,
    billingPeriod: "month",
  },
  ANNUAL: {
    prettyName: "Annual",
    label: "Annual Subscription",
    price: 5000,
    billingPeriod: "year",
  },
} as {
  readonly [Sub in SubscriptionPriceName]: Sub extends "TRIAL"
    ? TrialSubBillingDisplayConfigs
    : PaidSubBillingDisplayConfigs;
};

interface BaseSubPricingDisplayConfigs {
  prettyName: string;
  label: string;
  isTrial?: boolean;
}

type SubBillingInfo = {
  price: number;
  billingPeriod: "month" | "year";
};

type PaidSubBillingDisplayConfigs = BaseSubPricingDisplayConfigs &
  SubBillingInfo & {
    isTrial?: never;
    trialDays?: never;
    afterTrial?: never;
  };

type TrialSubBillingDisplayConfigs = BaseSubPricingDisplayConfigs & {
  price: 0;
  billingPeriod?: never;
  isTrial: true;
  trialDays: number;
  afterTrial: SubBillingInfo;
};

/**
 * An array of all subscription price names.
 */
export const USER_SUBSCRIPTION_PRICE_NAMES = Object.keys(
  SUB_PRICING_DISPLAY_CONFIGS
) as ReadonlyArray<SubscriptionPriceName>;

/**
 * A map of all subscription price names.
 */
export const SUBSCRIPTION_PRICE_NAMES = Object.fromEntries(
  USER_SUBSCRIPTION_PRICE_NAMES.map((name) => [name, name])
) as { readonly [Name in SubscriptionPriceName]: Name };
