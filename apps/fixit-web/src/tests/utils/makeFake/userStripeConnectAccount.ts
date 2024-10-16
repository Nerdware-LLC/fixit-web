import { faker } from "@faker-js/faker/locale/en_US";
import type { User, UserStripeConnectAccount } from "@/types/graphql.js";

export const makeFakeUserStripeConnectAccount = (
  { createdAt: userCreatedAt }: Partial<User>,
  overrides: Partial<UserStripeConnectAccount> | null = {}
): UserStripeConnectAccount => {
  const createdAt = userCreatedAt
    ? userCreatedAt
    : faker.date.soon({ days: 365, refDate: userCreatedAt });

  return {
    __typename: "UserStripeConnectAccount" as const,
    id: `acct_${faker.string.alphanumeric(12)}`,
    detailsSubmitted: faker.datatype.boolean(),
    chargesEnabled: faker.datatype.boolean(),
    payoutsEnabled: faker.datatype.boolean(),
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
    // merge any override values
    ...(overrides && overrides),
  };
};
