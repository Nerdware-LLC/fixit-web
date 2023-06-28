import type { SubscriptionPriceLabel } from "@graphql/types";

export const PRICE_INFO: Record<
  SubscriptionPriceLabel,
  {
    PRICE_NAME: string;
    PRICE_AMOUNT: string;
    PRICE_DESCRIPTION: string;
  }
> = {
  TRIAL: {
    PRICE_NAME: "Free Trial",
    PRICE_AMOUNT: "FREE",
    PRICE_DESCRIPTION: "Try it FREE\nfor 14 Days",
  },
  MONTHLY: {
    PRICE_NAME: "Monthly",
    PRICE_AMOUNT: "$5.00",
    PRICE_DESCRIPTION: "per\nmonth",
  },
  ANNUAL: {
    PRICE_NAME: "Annual",
    PRICE_AMOUNT: "$50.00",
    PRICE_DESCRIPTION: "per\nyear",
  },
};
