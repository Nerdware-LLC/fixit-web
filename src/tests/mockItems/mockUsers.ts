import { faker } from "@faker-js/faker";
import { makeFake } from "@/tests/utils/makeFake";
import { STATIC_MOCK_USERS } from "./staticMockUsers.js";
import type { User } from "@/types/graphql.js";
import type { StaticMockContactName } from "./staticMockContacts.js";

const createMockUser = (overrides: Partial<User> = {}): User => {
  const handle = makeFake.userHandle(overrides);
  const userID = makeFake.userID(handle);
  const userCreatedAt = overrides.createdAt ?? faker.date.past({ years: 3 });

  return {
    __typename: "User",
    id: userID,
    handle,
    email: makeFake.email(overrides),
    phone: makeFake.phone(overrides),
    profile: makeFake.userProfile(overrides, handle),
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
      return [randomMockUser.profile.displayName.replace(/(\s|-)/g, "_"), randomMockUser];
    })
  ),
} as Record<StaticMockContactName, User> & { [k: string]: User };

/**
 * This fn returns a random known User object.
 */
export const getRandomUser = () => {
  return faker.helpers.arrayElement([
    MOCK_USERS.Linda_McContractorLongName_Jones_Smith,
    MOCK_USERS.Aloy_McInvoicer,
    MOCK_USERS.Walt_McWorkOrder,
    MOCK_USERS.Astarion_Ancunin,
  ]);
};
