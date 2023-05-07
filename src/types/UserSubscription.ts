import type { SubscriptionStatus } from "@graphql/types";

export const USER_SUBSCRIPTION_STATUSES: ReadonlyArray<SubscriptionStatus> = [
  "active",
  "trialing",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "canceled",
  "unpaid",
] as const;

export const USER_SUBSCRIPTION_PRICE_LABELS = ["TRIAL", "MONTHLY", "ANNUAL"] as const;

export type UserSubscriptionPriceLabels = typeof USER_SUBSCRIPTION_PRICE_LABELS;
export type UserSubscriptionPriceLabel = UserSubscriptionPriceLabels[number];
