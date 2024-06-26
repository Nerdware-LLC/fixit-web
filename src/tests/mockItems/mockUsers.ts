import { faker } from "@faker-js/faker";
import { makeFake } from "@/tests/utils/makeFake";
import { STATIC_MOCK_USERS } from "./staticMockUsers.js";
import type { User } from "@/types/graphql.js";
import type { StaticMockContactName } from "./staticMockContacts.js";

const createMockUser = (overrides: Partial<User> = {}): User => {
  const userID = makeFake.userID(overrides);
  const handle = makeFake.userHandle(overrides);
  const userCreatedAt = overrides?.createdAt ?? faker.date.past({ years: 3 });

  return {
    __typename: "User",

    id: userID,
    handle,
    email: makeFake.email(overrides),
    phone: makeFake.phone(overrides),

    expoPushToken:
      overrides?.expoPushToken ??
      faker.helpers.maybe(() => `expo-${faker.string.alphanumeric(10)}`),

    profile: makeFake.userProfile(overrides, handle),

    stripeCustomerID: overrides?.stripeCustomerID ?? `cus_${faker.string.alphanumeric(12)}`,

    stripeConnectAccount: faker.helpers.maybe(
      () =>
        makeFake.userStripeConnectAccount(
          { createdAt: userCreatedAt },
          overrides?.stripeConnectAccount
        ),
      { probability: 0.9 }
    ),

    subscription: faker.helpers.maybe(
      () => makeFake.userSubscription({ createdAt: userCreatedAt }, overrides?.subscription),
      { probability: 0.9 }
    ),

    createdAt: userCreatedAt,
    updatedAt: faker.date.between({ from: userCreatedAt, to: new Date() }),
  };
};

/**
 * **Mock Users**
 * - Includes 10 randos, as well as the 5 "known" users in `STATIC_MOCK_USERS`
 *   explicitly provided to ensure some names are available via intellisense and
 *   can be used to implement stateful item dependency relationships, such as the
 *   attachment of an Invoice to a WorkOrder (the WorkOrder's "assignedTo" user
 *   must be the Invoice's "createdBy" user).
 */
export const MOCK_USERS = {
  ...STATIC_MOCK_USERS,
  // plus 10 randos:
  ...Object.fromEntries(
    Array.from({ length: 10 }).map(() => {
      const randomMockUser = createMockUser();
      return [
        randomMockUser.profile?.displayName?.replace(/(\s|-)/g, "_") ?? randomMockUser.handle,
        randomMockUser,
      ];
    })
  ),
} as Record<StaticMockContactName, User> & { [k: string]: User };
