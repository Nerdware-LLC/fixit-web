import { faker } from "@faker-js/faker/locale/en_US";
import { USER_SUBSCRIPTION_STATUSES } from "@/types/UserSubscription.js";
import type { User, UserSubscription } from "@/types/graphql.js";

export const makeFakeUserSubscription = (
  { createdAt: userCreatedAt }: Partial<User>,
  overrides: Partial<UserSubscription> | null = {}
): UserSubscription => {
  const createdAt = userCreatedAt
    ? userCreatedAt
    : faker.date.soon({ days: 365, refDate: userCreatedAt });

  return {
    __typename: "UserSubscription" as const,
    id: `sub_${faker.string.alphanumeric(12)}`,
    currentPeriodEnd: faker.date.soon({ days: 150 }),
    productID: `prod_${faker.string.alphanumeric(12)}`,
    priceID: `price_${faker.string.alphanumeric(12)}`,
    status: faker.helpers.arrayElement(USER_SUBSCRIPTION_STATUSES),
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
    // merge any override values
    ...(overrides && overrides),
  };
};
