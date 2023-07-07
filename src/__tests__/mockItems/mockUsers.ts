import { faker } from "@faker-js/faker";
import { makeFake } from "@tests/utils/makeFake";
import { USER_SUBSCRIPTION_STATUSES } from "@/types/UserSubscription";
import type { User } from "@graphql/types";

const createMockUser = (overrides: Partial<User> = {}): User & { __typename: "User" } => {
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

    stripeCustomerID: overrides?.stripeCustomerID ?? `customer_${faker.string.alphanumeric(10)}`,

    stripeConnectAccount: faker.helpers.maybe(
      () => ({
        id: `account_${faker.string.alphanumeric(12)}`,
        detailsSubmitted: faker.datatype.boolean(),
        chargesEnabled: faker.datatype.boolean(),
        payoutsEnabled: faker.datatype.boolean(),
        // if User.createdAt is defined, use same value here
        ...(userCreatedAt && {
          createdAt: userCreatedAt,
          updatedAt: faker.date.recent({ days: 150 }),
        }),
        // merge possible SCA override values
        ...(overrides?.stripeConnectAccount && overrides.stripeConnectAccount),
      }),
      { probability: 0.9 }
    ),

    subscription: faker.helpers.maybe(
      () => {
        /* Allow subs to either have been created at the same time as the
        User (most likely), OR within 1 year of account creation. Note that
        this value is converted to a unix timestamp for the Sub ID.  */
        const subCreatedAt = faker.helpers.arrayElement([
          ...(userCreatedAt ? [userCreatedAt] : []),
          faker.date.soon({ days: 365, refDate: userCreatedAt }),
        ]);

        return {
          id: `SUBSCRIPTION#${userID}#${Math.floor(subCreatedAt.getTime() / 1000)}`,
          currentPeriodEnd: faker.date.soon({ days: 150 }),
          productID: `product_${faker.string.alphanumeric(10)}`,
          priceID: `price_${faker.string.alphanumeric(10)}`,
          status: faker.helpers.arrayElement(USER_SUBSCRIPTION_STATUSES),
          createdAt: subCreatedAt,
          updatedAt: faker.date.recent({ days: 150 }),
          // merge possible subscription override values
          ...(overrides?.subscription && overrides.subscription),
        };
      },
      { probability: 0.9 }
    ),

    createdAt: userCreatedAt,
    updatedAt: faker.date.recent({ days: 150, refDate: userCreatedAt }),
  };
};

/**
 * **Mock Users**
 *
 * - Includes 10 randos, as well as the 5 "known" users listed below which are
 *   explicitly provided to ensure some names are available via intellisense and
 *   can be used to implement stateful item dependency relationships, such as the
 *   attachment of an Invoice to a WorkOrder (the WorkOrder's "assignedTo" user
 *   must be the Invoice's "createdBy" user).
 *
 *
 * | Name                                   | Description                                  |
 * | :------------------------------------- | :------------------------------------------- |
 * | Guy McPerson                           | Default auth'd user used during dev/testing  |
 * | Linda McContractorLongName-Jones-Smith | For testing layout with long hyphenated name |
 * | Aloy McInvoicer                        | Sends and receives WOs + INVs with Guy McP   |
 * | Walt McWorkOrder                       | Sends and receives WOs + INVs with Guy McP   |
 * | Rick Sanchez                           | Sends and receives WOs + INVs with Guy McP   |
 */
export const MOCK_USERS = Object.fromEntries(
  [
    /* mock users with overrides for certain desired mock values (see jsdoc)
    STATIC_MOCK_ITEM_KEY is necessary to ensure an auto-gen'd `businessName`
    is not used as the known users' top-level key in MOCK_USERS.  */
    {
      STATIC_MOCK_ITEM_KEY: "Guy_McPerson",
      handle: "@user_person",
      email: "person@user.com",
      profile: {
        displayName: "Guy McPerson",
        givenName: "Guy",
        familyName: "McPerson",
        photoUrl: "https://freesvg.org/img/Linux-Avatar.png",
      },
    },
    {
      STATIC_MOCK_ITEM_KEY: "Linda_McContractorLongName_Jones_Smith",
      handle: "@linda_mcContractorLongName_jones_smith",
      email: "linda_mcContractorLongName_jones_smith@foo.com",
      profile: {
        displayName: "Linda McContractorLongName-Jones-Smith",
        givenName: "Linda",
        familyName: "McContractorLongName-Jones-Smith",
        photoUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Ag644EkMQU8g8jx8tndxdoWO2myw8km7rg&usqp=CAU",
      },
    },
    {
      STATIC_MOCK_ITEM_KEY: "Aloy_McInvoicer",
      handle: "@aloy_mcInvoicer",
      email: "mech_hunter@gmail.com",
      profile: {
        displayName: "Aloy McInvoicer",
        givenName: "Aloy",
        familyName: "McInvoicer",
        photoUrl:
          "https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F9ef717b7-b72a-407f-b14c-7fe86a3b9afe_832x468.jpeg",
      },
    },
    {
      STATIC_MOCK_ITEM_KEY: "Walt_McWorkOrder",
      handle: "@walt_mcWorkOrder",
      email: "arrow_in_the_knee@foo.biz",
      profile: {
        displayName: "Walt McWorkOrder",
        givenName: "Walt",
        familyName: "McWorkOrder",
        photoUrl:
          "https://images.uesp.net/thumb/d/db/SR-npc-Whiterun_Guard.jpg/200px-SR-npc-Whiterun_Guard.jpg",
      },
    },
    {
      STATIC_MOCK_ITEM_KEY: "Rick_Sanchez",
      handle: "@rick",
      email: "rick@portals.gov",
      profile: {
        displayName: "Rick Sanchez",
        givenName: "Rick",
        familyName: "Sanchez",
        photoUrl:
          "https://img.favpng.com/2/23/11/pocket-mortys-rick-sanchez-morty-smith-computer-icons-deviantart-png-favpng-SCyrErQCp1UEjsF3tbd6zYbjW.jpg",
      },
    },
    // plus 10 total randos (spreading the sparse array converts the empty slots into undefined)
    ...Array(10),
  ]
    // make the mock user objects:
    .map(({ STATIC_MOCK_ITEM_KEY, ...maybeMockUserInput } = {}) => ({
      ...(STATIC_MOCK_ITEM_KEY && { STATIC_MOCK_ITEM_KEY }),
      ...createMockUser(maybeMockUserInput),
    }))
    // now for fromEntries, make [k,v] entries using displayName/handle for keys
    .map(({ STATIC_MOCK_ITEM_KEY, ...mockUser }) => [
      // replace spaces and hyphens with underscores
      STATIC_MOCK_ITEM_KEY ??
        (mockUser.profile?.displayName
          ? mockUser.profile.displayName.replace(/(\s|-)/g, "_")
          : mockUser.handle),
      mockUser,
    ])
) as {
  // this type cast provides certain known keys on MOCK_USERS in intellisense
  Guy_McPerson: User;
  Linda_McContractorLongName_Jones_Smith: User;
  Aloy_McInvoicer: User;
  Walt_McWorkOrder: User;
  Rick_Sanchez: User;
  [k: string]: User;
};
