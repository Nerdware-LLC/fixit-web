import type { Contact } from "@/types/graphql.js";

/**
 * **STATIC Mock Contacts**
 * - This is useful for testing, as it provides a consistent set of data.
 *
 * | Name                                   | Description                                  |
 * | :------------------------------------- | :------------------------------------------- |
 * | Linda McContractorLongName-Jones-Smith | For testing layout with long hyphenated name |
 * | Aloy McInvoicer                        | Sends and receives WOs + INVs with Guy McP   |
 * | Walt McWorkOrder                       | Sends and receives WOs + INVs with Guy McP   |
 * | Rick Sanchez                           | Sends and receives WOs + INVs with Guy McP   |
 */
export const STATIC_MOCK_CONTACTS = {
  Linda_McContractorLongName_Jones_Smith: {
    __typename: "Contact",
    id: "CONTACT#USER#@linda_mcContractorLongName_jones_smith",
    handle: "@linda_mcContractorLongName_jones_smith",
    email: "linda_mcContractorLongName_jones_smith@foo.com",
    phone: "7978667438",
    profile: {
      __typename: "Profile",
      givenName: "Linda",
      familyName: "McContractorLongName-Jones-Smith",
      businessName: "Fritsch - Champlin",
      displayName: "Linda McContractorLongName-Jones-Smith",
      photoUrl: "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/60-512.png",
    },
    updatedAt: new Date("2024-01-24T22:40:15.006Z"),
    createdAt: new Date("2021-09-07T08:16:41.288Z"),
  },
  Aloy_McInvoicer: {
    __typename: "Contact",
    id: "CONTACT#USER#@aloy_mcInvoicer",
    handle: "@aloy_mcInvoicer",
    email: "mech_hunter@gmail.com",
    phone: "4216104084",
    profile: {
      __typename: "Profile",
      givenName: "Aloy",
      familyName: "McInvoicer",
      businessName: "Labadie, Carter and Davis",
      displayName: "Aloy McInvoicer",
      photoUrl: "https://cdn.mos.cms.futurecdn.net/nqnUXPY5q2YuxE3t4eESVL.jpg",
    },
    updatedAt: new Date("2024-02-03T22:22:55.480Z"),
    createdAt: new Date("2023-12-26T10:55:02.243Z"),
  },
  Walt_McWorkOrder: {
    __typename: "Contact",
    id: "CONTACT#USER#@walt_mcWorkOrder",
    handle: "@walt_mcWorkOrder",
    email: "arrow_in_the_knee@foo.biz",
    phone: "7026949910",
    profile: {
      __typename: "Profile",
      givenName: "Walt",
      familyName: "McWorkOrder",
      businessName: "Bechtelar Group",
      displayName: "Walt McWorkOrder",
      photoUrl: "https://avatars.githubusercontent.com/u/2001",
    },
    updatedAt: new Date("2023-02-24T18:55:01.886Z"),
    createdAt: new Date("2022-05-20T08:52:35.944Z"),
  },
  Astarion_Ancunin: {
    __typename: "Contact",
    id: "CONTACT#USER#@rogue_vamp",
    handle: "@rogue_vamp",
    email: "astarion_3@gmail.com",
    phone: "7228277105",
    profile: {
      __typename: "Profile",
      givenName: "Astarion",
      familyName: "Ancunín",
      businessName: null,
      displayName: "Astarion Ancunín",
      photoUrl: "https://bg3.wiki/w/images/thumb/0/00/Astarion-ea.jpg/800px-Astarion-ea.jpg",
    },
    updatedAt: new Date("2022-01-18T00:58:22.908Z"),
    createdAt: new Date("2021-08-09T07:10:11.829Z"),
  },
} as const satisfies Record<string, Contact>;

export type StaticMockContactName = keyof typeof STATIC_MOCK_CONTACTS;

/**
 * Array of Contacts to mock the `MyContacts` GQL query response.
 */
export const STATIC_MOCK_MY_CONTACTS_RESPONSE = {
  myContacts: Object.values(STATIC_MOCK_CONTACTS),
} as const satisfies { myContacts: Array<Contact> };
