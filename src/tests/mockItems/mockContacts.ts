import { faker } from "@faker-js/faker";
import { makeFake } from "@/tests/utils/makeFake";
import { MOCK_USERS } from "./mockUsers.js";
import type { Contact } from "@/types/graphql.js";
import type { SetRequired } from "type-fest";
import type { StaticMockContactName } from "./staticMockContacts.js";

const createMockContact = (
  overrides: Partial<Contact> & { userID?: string } = {}
): SetRequired<Contact, "__typename"> => {
  const handle = makeFake.userHandle(overrides);
  const createdAt = overrides?.createdAt ?? faker.date.recent({ days: 365 });

  return {
    __typename: "Contact",
    id: overrides?.id
      ? overrides.id
      : overrides?.userID
        ? `CONTACT#${overrides.userID}`
        : `CONTACT#${makeFake.userID(handle)}`,
    handle,
    email: makeFake.email(overrides),
    phone: makeFake.phone(overrides),
    profile: makeFake.userProfile(overrides, handle),
    createdAt,
    updatedAt: overrides?.updatedAt ?? faker.date.between({ from: createdAt, to: new Date() }),
  };
};

/**
 * **Mock Contacts**
 * - A list of contacts for default dev/test user "Guy McPerson" pulled from MOCK_USERS,
 *   which includes 10 rando users and the 4 "known" users in `STATIC_MOCK_USERS`.
 */
export const MOCK_CONTACTS = Object.entries(MOCK_USERS).reduce(
  (accum, [nameKey, { __typename, id: userID, ...user }]) => {
    // filter out "Guy McPerson", the default dev/test user, convert the rest to contacts
    return nameKey === "Guy_McPerson"
      ? accum
      : { ...accum, [nameKey]: createMockContact({ userID, ...user }) };
  },
  {}
) as Record<StaticMockContactName, Contact> & { [k: string]: Contact };

/**
 * Array of 50 Contacts to mock the `MyContacts` GQL query response.
 */
export const MOCK_MY_CONTACTS_RESPONSE = {
  myContacts: [
    ...Object.values(MOCK_CONTACTS),
    ...Array.from({ length: 46 }, () => createMockContact()),
  ],
} as const satisfies { myContacts: Array<Contact> };

/**
 * This fn returns a random Contact for "Guy McPerson"
 */
export const getRandomContact = () => {
  return faker.helpers.arrayElement([
    MOCK_CONTACTS.Linda_McContractorLongName_Jones_Smith,
    MOCK_CONTACTS.Aloy_McInvoicer,
    MOCK_CONTACTS.Walt_McWorkOrder,
    MOCK_CONTACTS.Astarion_Ancunin,
  ]);
};
