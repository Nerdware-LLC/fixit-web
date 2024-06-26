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

export const USER_SUBSCRIPTION_PRICE_NAMES = [
  "TRIAL",
  "MONTHLY",
  "ANNUAL",
] as const satisfies ReadonlyArray<SubscriptionPriceName>;
