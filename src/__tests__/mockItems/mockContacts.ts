import { faker } from "@faker-js/faker";
import { makeFake } from "@tests/utils";
import { MOCK_USERS } from "./mockUsers";
import type { Contact } from "@graphql/types";

const createMockContact = (
  overrides: Partial<Contact> & { userID?: string } = {}
): Contact & { __typename: "Contact" } => {
  const handle = makeFake.userHandle(overrides);
  const createdAt = overrides?.createdAt ?? faker.date.recent(365);

  return {
    __typename: "Contact",

    id: overrides?.id
      ? overrides.id
      : overrides?.userID
      ? `CONTACT#${overrides.userID}`
      : `CONTACT#${makeFake.userID()}`,
    handle,
    email: makeFake.email(overrides),
    phone: makeFake.phone(overrides),
    profile: makeFake.userProfile(overrides, handle),
    createdAt,
    updatedAt: overrides?.updatedAt ?? faker.date.between(createdAt, new Date()),
  };
};

/**
 * **Mock Contacts**
 *
 * - A list of contacts for default dev/test user "Guy McPerson" pulled from MOCK_USERS,
 *   which includes 10 rando users and the 4 "known" users listed below.
 *
 * | Name                                   | Description                                  |
 * | :------------------------------------- | :------------------------------------------- |
 * | Linda McContractorLongName-Jones-Smith | For testing layout with long hyphenated name |
 * | Aloy McInvoicer                        | Sends and receives WOs + INVs with Guy McP   |
 * | Walt McWorkOrder                       | Sends and receives WOs + INVs with Guy McP   |
 * | Rick Sanchez                           | Sends and receives WOs + INVs with Guy McP   |
 */
export const MOCK_CONTACTS = Object.entries(MOCK_USERS).reduce(
  (accum, [nameKey, { id: userID, ...user }]) => {
    // filter out "Guy McPerson", the default dev/test user, convert the rest to contacts
    return nameKey === "Guy_McPerson"
      ? accum
      : { ...accum, [nameKey]: createMockContact({ userID, ...user }) };
  },
  {}
) as {
  // this type cast provides certain known keys on MOCK_CONTACTS in intellisense
  Linda_McContractorLongName_Jones_Smith: Contact;
  Aloy_McInvoicer: Contact;
  Walt_McWorkOrder: Contact;
  Rick_Sanchez: Contact;
  [k: string]: Contact;
};

/**
 * This fn returns a random Contact for "Guy McPerson"
 */
export const getRandomContact = () => {
  return faker.helpers.arrayElement([
    MOCK_CONTACTS.Linda_McContractorLongName_Jones_Smith,
    MOCK_CONTACTS.Aloy_McInvoicer,
    MOCK_CONTACTS.Walt_McWorkOrder,
    MOCK_CONTACTS.Rick_Sanchez,
  ]);
};
