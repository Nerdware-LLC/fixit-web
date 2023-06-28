import type { SubscriptionStatus, SubscriptionPriceLabel } from "@graphql/types";

export const USER_SUBSCRIPTION_STATUSES: ReadonlyArray<SubscriptionStatus> = [
  "active",
  "trialing",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "canceled",
  "unpaid",
] as const;

export const USER_SUBSCRIPTION_PRICE_LABELS: ReadonlyArray<SubscriptionPriceLabel> = [
  "TRIAL",
  "MONTHLY",
  "ANNUAL",
] as const;
