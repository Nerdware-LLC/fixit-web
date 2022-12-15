export const USER_SUBSCRIPTION_CONSTANTS = {
  PRICE_LABELS: ["TRIAL", "MONTHLY", "ANNUAL"],
  STATUSES: [
    "active",
    "trialing",
    "incomplete",
    "incomplete_expired",
    "past_due",
    "canceled",
    "unpaid"
  ]
} as const;

export type UserSubscription = {
  id: string;
  currentPeriodEnd: Date;
  productID: string;
  priceID: string;
  status: typeof USER_SUBSCRIPTION_CONSTANTS.STATUSES[number];
  createdAt: Date;
  updatedAt: Date;
};

export type UserSubscriptionPriceLabel = typeof USER_SUBSCRIPTION_CONSTANTS.PRICE_LABELS[number];
