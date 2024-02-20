import type { SubscriptionStatus, SubscriptionPriceLabel } from "@/graphql/types";

export const USER_SUBSCRIPTION_STATUSES = [
  "active",
  "trialing",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "canceled",
  "unpaid",
] as const satisfies ReadonlyArray<SubscriptionStatus>;

export const USER_SUBSCRIPTION_PRICE_LABELS = [
  "TRIAL",
  "MONTHLY",
  "ANNUAL",
] as const satisfies ReadonlyArray<SubscriptionPriceLabel>;
