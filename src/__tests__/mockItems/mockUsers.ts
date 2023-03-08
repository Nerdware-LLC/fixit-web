import { faker } from "@faker-js/faker";
import { CONSTANTS } from "@types";
import { makeFake } from "./_common";
import type { User } from "@types";

const createMockUser = (overrides: Partial<User> = {}): User => {
  const userID = makeFake.userID(overrides);
  const handle = makeFake.userHandle(overrides);
  const loginType = faker.helpers.arrayElement(["LOCAL", "GOOGLE_OAUTH"]);
  const userCreatedAt = overrides?.createdAt ?? faker.helpers.maybe(() => faker.date.past(3));

  return {
    id: userID,
    handle,
    email: makeFake.email(overrides),
    phone: makeFake.phone(overrides),

    expoPushToken:
      overrides?.expoPushToken ??
      faker.helpers.maybe(() => `expo-${faker.random.alphaNumeric(10)}`),

    profile: makeFake.userProfile({ ...overrides, handle }),

    login: {
      type: loginType,
      ...(loginType === "LOCAL"
        ? { passwordHash: faker.random.alphaNumeric(15) }
        : {
            googleID: `googleID-${faker.random.alphaNumeric(10)}`,
            googleAccessToken: `googleAccessToken-${faker.random.alphaNumeric(10)}`
          }),
      // merge possible login override values
      ...(overrides?.login && overrides.login)
    } as User["login"],

    stripeCustomerID: overrides?.stripeCustomerID ?? `customer_${faker.random.alphaNumeric(10)}`,

    stripeConnectAccount: faker.helpers.maybe(
      () => ({
        id: `account_${faker.random.alphaNumeric(12)}`,
        detailsSubmitted: faker.datatype.boolean(),
        chargesEnabled: faker.datatype.boolean(),
        payoutsEnabled: faker.datatype.boolean(),
        // if User.createdAt is defined, use same value here
        ...(userCreatedAt && {
          createdAt: userCreatedAt,
          updatedAt: faker.date.recent(150) // within 150 days
        }),
        // merge possible SCA override values
        ...(overrides?.stripeConnectAccount && overrides.stripeConnectAccount)
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
          faker.date.soon(365, userCreatedAt) // userCreatedAt = faker ref date
        ]);

        return {
          id: `SUBSCRIPTION#${userID}#${Math.floor(subCreatedAt.getTime() / 1000)}`,
          currentPeriodEnd: faker.date.soon(150),
          productID: `product_${faker.random.alphaNumeric(10)}`,
          priceID: `price_${faker.random.alphaNumeric(10)}`,
          status: faker.helpers.arrayElement(CONSTANTS.USER_SUBSCRIPTION.STATUSES),
          createdAt: subCreatedAt,
          updatedAt: faker.date.recent(150),
          // merge possible subscription override values
          ...(overrides?.subscription && overrides.subscription)
        };
      },
      { probability: 0.9 }
    ),

    ...(userCreatedAt && {
      createdAt: userCreatedAt,
      updatedAt: faker.date.recent(150, userCreatedAt) // within 150 days of userCreatedAt
    })
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
        businessName: "Guy McPerson",
        givenName: "Guy",
        familyName: "McPerson",
        photoUrl: "https://freesvg.org/img/Linux-Avatar.png"
      }
    },
    {
      STATIC_MOCK_ITEM_KEY: "Linda_McContractorLongName_Jones_Smith",
      handle: "@linda_mcContractorLongName_jones_smith",
      email: "linda_mcContractorLongName_jones_smith@foo.com",
      profile: {
        businessName: "Linda McContractorLongName-Jones-Smith",
        givenName: "Linda",
        familyName: "McContractorLongName-Jones-Smith",
        photoUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Ag644EkMQU8g8jx8tndxdoWO2myw8km7rg&usqp=CAU"
      }
    },
    {
      STATIC_MOCK_ITEM_KEY: "Aloy_McInvoicer",
      handle: "@aloy_mcInvoicer",
      email: "mech_hunter@gmail.com",
      profile: {
        businessName: "Aloy McInvoicer",
        givenName: "Aloy",
        familyName: "McInvoicer",
        photoUrl:
          "https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F9ef717b7-b72a-407f-b14c-7fe86a3b9afe_832x468.jpeg"
      }
    },
    {
      STATIC_MOCK_ITEM_KEY: "Walt_McWorkOrder",
      handle: "@walt_mcWorkOrder",
      email: "arrow_in_the_knee@foo.biz",
      profile: {
        businessName: "Walt McWorkOrder",
        givenName: "Walt",
        familyName: "McWorkOrder",
        photoUrl:
          "https://scontent.fosu2-1.fna.fbcdn.net/v/t39.30808-6/224412240_4495191273848214_8460490680690138314_n.jpg?stp=cp0_dst-jpg_e15_p320x320_q65&_nc_cat=100&ccb=1-7&_nc_sid=8024bb&_nc_ohc=jYPoILLDm0IAX-qcPUD&_nc_ht=scontent.fosu2-1.fna&oh=00_AfAQCTxBUfI1hZUchtacQddG9xuz1kS7n0lPHlbZk7u3lw&oe=63B9AD2B"
      }
    },
    {
      STATIC_MOCK_ITEM_KEY: "Rick_Sanchez",
      handle: "@rick",
      email: "rick@portals.gov",
      profile: {
        businessName: "Rick Sanchez",
        givenName: "Rick",
        familyName: "Sanchez",
        photoUrl:
          "https://img.favpng.com/2/23/11/pocket-mortys-rick-sanchez-morty-smith-computer-icons-deviantart-png-favpng-SCyrErQCp1UEjsF3tbd6zYbjW.jpg"
      }
    },
    // plus 10 total randos (spreading the sparse array converts the empty slots into undefined)
    ...Array(10)
  ]
    // make the mock user objects:
    .map(({ STATIC_MOCK_ITEM_KEY, ...maybeMockUserInput } = {}) => ({
      ...(STATIC_MOCK_ITEM_KEY && { STATIC_MOCK_ITEM_KEY }),
      ...createMockUser(maybeMockUserInput)
    }))
    // now for fromEntries, make [k,v] entries using displayName/handle for keys
    .map(({ STATIC_MOCK_ITEM_KEY, ...mockUser }) => [
      // replace spaces and hyphens with underscores
      STATIC_MOCK_ITEM_KEY ??
        (mockUser.profile?.displayName
          ? mockUser.profile.displayName.replace(/(\s|-)/g, "_")
          : mockUser.handle),
      mockUser
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
