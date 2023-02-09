import { faker } from "@faker-js/faker";
import { makeFake } from "./_common";
import { MOCK_USERS } from "./mockUsers";
import type { Contact } from "@types";

const createMockContact = (overrides: Partial<Contact> & { userID?: string } = {}): Contact => {
  return {
    id: overrides?.id ?? `CONTACT#${overrides?.userID ?? makeFake.userID()}`,
    handle: makeFake.userHandle(overrides),
    email: makeFake.email(overrides),
    phone: makeFake.phone(overrides),
    profile: makeFake.userProfile(overrides)
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
export const MOCK_CONTACTS = Object.entries(MOCK_USERS).reduce((accum, [nameKey, user]) => {
  // filter out "Guy McPerson", the default dev/test user, convert the rest to contacts
  return nameKey === "Guy_McPerson" ? accum : { ...accum, [nameKey]: createMockContact(user) };
}, {}) as {
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
    MOCK_CONTACTS.Rick_Sanchez
  ]);
};
