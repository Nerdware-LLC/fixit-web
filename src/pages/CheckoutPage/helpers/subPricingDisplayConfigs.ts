import type { SubscriptionPriceLabel } from "@/graphql/types";

/**
 * > `The values used here are for DISPLAY PURPOSES ONLY and merely convey
 *   information to the user. All pricing/product info is stored and calculated
 *   by the backend API. Sending invalid pricing/product info to the server
 *   results a 400 response.`
 */
export const SUB_PRICING_DISPLAY_CONFIGS = {
  TRIAL: {
    label: "Try Fixit",
    price: 0,
    trialDays: 14,
    afterTrial: {
      price: 500,
      billingPeriod: "month",
    },
  },
  MONTHLY: {
    label: "Monthly Subscription",
    price: 500,
    billingPeriod: "month",
  },
  ANNUAL: {
    label: "Annual Subscription",
    price: 5000,
    billingPeriod: "year",
  },
} as {
  readonly [Sub in SubscriptionPriceLabel]: Sub extends "TRIAL"
    ? TrialSubBillingDisplayConfigs
    : PaidSubBillingDisplayConfigs;
};

interface BaseSubPricingDisplayConfigs {
  label: string;
}

type SubBillingInfo = {
  price: number;
  billingPeriod: "month" | "year";
};

type PaidSubBillingDisplayConfigs = BaseSubPricingDisplayConfigs &
  SubBillingInfo & {
    trialDays?: never;
    afterTrial?: never;
  };

type TrialSubBillingDisplayConfigs = BaseSubPricingDisplayConfigs & {
  price: 0;
  trialDays: number;
  afterTrial: SubBillingInfo;
  billingPeriod?: never;
};
