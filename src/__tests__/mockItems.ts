import { User, WorkOrder, Invoice, Contact } from "@types";

/**
 * Mock `User` objects, organized by name.
 */
export const MOCK_USERS: Record<string, User> = {
  Guy_McPerson: {
    id: "USER#11111111-1111-1111-1111-111111111111",
    handle: "@user_guy",
    email: "guy_1@foo.com",
    phone: "1111111111",
    login: { type: "LOCAL", passwordHash: "foo-pw-hash-1" },
    stripeCustomerID: "stripe-cust-id-1",
    profile: {
      displayName: "Guy McPerson",
      givenName: "Guy",
      familyName: "McPerson",
      photoUrl: "https://freesvg.org/img/Linux-Avatar.png"
    }
  },
  Linda_McContractor: {
    id: "USER#22222222-2222-2222-2222-222222222222",
    handle: "@linda_mcContractor",
    email: "linda_2@foo.com",
    phone: "2222222222",
    login: { type: "LOCAL", passwordHash: "foo-pw-hash-2" },
    stripeCustomerID: "stripe-cust-id-2",
    profile: {
      displayName: "Linda McContractor",
      photoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Ag644EkMQU8g8jx8tndxdoWO2myw8km7rg&usqp=CAU"
    }
  },
  Rick_Sanchez: {
    id: "USER#33333333-3333-3333-3333-333333333333",
    handle: "@rick",
    email: "rick_3@foo.com",
    phone: "3333333333",
    login: { type: "LOCAL", passwordHash: "foo-pw-hash-3" },
    stripeCustomerID: "stripe-cust-id-3",
    profile: {
      displayName: "Rick Sanchez",
      photoUrl:
        "https://img.favpng.com/2/23/11/pocket-mortys-rick-sanchez-morty-smith-computer-icons-deviantart-png-favpng-SCyrErQCp1UEjsF3tbd6zYbjW.jpg"
    }
  },
  Randy_LeDude: {
    id: "USER#44444444-4444-4444-4444-444444444444",
    handle: "@randy",
    email: "randy_4@foo.com",
    phone: "4444444444",
    login: { type: "LOCAL", passwordHash: "foo-pw-hash-4" },
    stripeCustomerID: "stripe-cust-id-4",
    profile: {
      displayName: "Randy LeDude",
      photoUrl:
        "https://cdn.shopify.com/s/files/1/0170/5859/4880/files/randyVideoOverlay_550a63f5-5ff4-4ac7-917f-630ba96e4673_1980x.png?v=1613773219"
    }
  }
};

const MOCK_LOCATION_COMMON_VALUES = {
  city: "Columbus",
  region: "Ohio",
  country: "USA"
};

/**
 * Emulates the response structure of the `MyWorkOrders` GQL query.
 */
export const MOCK_WORK_ORDERS = {
  myWorkOrders: {
    createdByUser: [
      {
        id: "WO-1",
        createdBy: MOCK_USERS.Guy_McPerson,
        assignedTo: null,
        location: { streetLine1: "123 Abc Street", ...MOCK_LOCATION_COMMON_VALUES },
        description: "Do a thing and another thing.",
        status: "UNASSIGNED",
        priority: "NORMAL",
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "WO-2",
        createdBy: MOCK_USERS.Guy_McPerson,
        assignedTo: MOCK_USERS.Rick_Sanchez,
        location: {
          streetLine1: "456 North LongStreetName-LongStreetName Avenue N.",
          ...MOCK_LOCATION_COMMON_VALUES
        },
        description: "Foooooooo description.",
        // prettier-ignore
        checklist: [
          { id: "WO-2:CHECKLIST-ITEM-1", description: "First, do a thing", isCompleted: true },
          { id: "WO-2:CHECKLIST-ITEM-2", description: "Second, test the effects of different frequencies on the fabric of reality.", isCompleted: true },
          { id: "WO-2:CHECKLIST-ITEM-3", description: "Third, experiment with different flavors of interdimensional breakfast cereal.", isCompleted: true },
          { id: "WO-2:CHECKLIST-ITEM-4", description: "Fourth, write a grant proposal for funding to the Council of Ricks.", isCompleted: false },
          { id: "WO-2:CHECKLIST-ITEM-5", description: "Fifth, test the stability of the multiverse by creating a black hole in the garage.", isCompleted: true },
          { id: "WO-2:CHECKLIST-ITEM-6", description: "Sixth, repair the spaceship's propulsion system.", isCompleted: false },
          { id: "WO-2:CHECKLIST-ITEM-7", description: "Seventh, conduct research on the effects of time travel on human DNA.", isCompleted: true },
          { id: "WO-2:CHECKLIST-ITEM-8", description: "Eighth, create a formula for a new and improved version of concentrated dark matter.", isCompleted: true },
          { id: "WO-2:CHECKLIST-ITEM-9", description: "Ninth, experiment with new flavors of mega seeds.", isCompleted: false },
          { id: "WO-2:CHECKLIST-ITEM-10", description: "Tenth, invent a new portal gun prototype.", isCompleted: true },
          { id: "WO-2:CHECKLIST-ITEM-11", description: "Eleventh, repair the garage roof with alien technology.", isCompleted: true },
          { id: "WO-2:CHECKLIST-ITEM-12", description: "Twelfth, do another thing", isCompleted: false },
          { id: "WO-2:CHECKLIST-ITEM-13", description: "Thirteenth, wubba-lubba-dub-dub (check in on bird person)", isCompleted: false }
        ],
        status: "COMPLETE",
        priority: "LOW",
        entryContact: "Joe Mama",
        entryContactPhone: "(900) 555-5555",
        dueDate: new Date("2025-11-01T03:24:00"),
        scheduledDateTime: new Date("2023-11-01T03:24:00"),
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "WO-3",
        createdBy: MOCK_USERS.Guy_McPerson,
        assignedTo: MOCK_USERS.Linda_McContractor,
        location: { streetLine1: "555 Cherry Blvd", ...MOCK_LOCATION_COMMON_VALUES },
        description: "Buy it, use it, break it, fix it. Trash it, change it, mail - upgrade it.",
        status: "ASSIGNED",
        priority: "HIGH",
        createdAt: new Date("2020-03-01T03:24:00"),
        updatedAt: new Date()
      }
    ],
    assignedToUser: [
      {
        id: "WO-4",
        createdBy: MOCK_USERS.Rick_Sanchez,
        assignedTo: MOCK_USERS.Guy_McPerson,
        location: { streetLine1: "1 FooPlanetName Place", ...MOCK_LOCATION_COMMON_VALUES },
        description: "Fix thing at planet place.",
        status: "COMPLETE",
        priority: "HIGH",
        category: "PEST",
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "WO-5",
        createdBy: MOCK_USERS.Linda_McContractor,
        assignedTo: MOCK_USERS.Guy_McPerson,
        location: {
          streetLine1: "88888 North LongStreetName-LongStreetName Avenue N.",
          ...MOCK_LOCATION_COMMON_VALUES
        },
        description: "Get a thing done.",
        status: "IN_PROGRESS",
        priority: "NORMAL",
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "WO-6",
        createdBy: MOCK_USERS.Randy_LeDude,
        assignedTo: MOCK_USERS.Guy_McPerson,
        location: { streetLine1: "420 Nice Street", ...MOCK_LOCATION_COMMON_VALUES },
        // prettier-ignore
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "ASSIGNED",
        priority: "LOW",
        createdAt: new Date("2020-03-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "WO-7",
        createdBy: MOCK_USERS.Rick_Sanchez,
        assignedTo: MOCK_USERS.Guy_McPerson,
        location: { streetLine1: "1 FooPlanetName Place", ...MOCK_LOCATION_COMMON_VALUES },
        description: "Fix thing at planet place.",
        status: "DEFERRED",
        priority: "NORMAL",
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "WO-8",
        createdBy: MOCK_USERS.Linda_McContractor,
        assignedTo: MOCK_USERS.Guy_McPerson,
        location: {
          streetLine1: "88888 North LongStreetName-LongStreetName Avenue N.",
          ...MOCK_LOCATION_COMMON_VALUES
        },
        description: "Get a thing done.",
        status: "IN_PROGRESS",
        priority: "HIGH",
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "WO-9",
        createdBy: MOCK_USERS.Randy_LeDude,
        assignedTo: MOCK_USERS.Guy_McPerson,
        location: { streetLine1: "420 Nice Street", ...MOCK_LOCATION_COMMON_VALUES },
        description: "Foo",
        status: "COMPLETE",
        priority: "NORMAL",
        createdAt: new Date("2020-03-01T03:24:00"),
        updatedAt: new Date()
      }
    ]
  }
} as {
  myWorkOrders: Record<"createdByUser" | "assignedToUser", Array<WorkOrder>>;
};

/**
 * Emulates the response structure of the `MyInvoices` GQL query.
 */
export const MOCK_INVOICES: {
  myInvoices: Record<"createdByUser" | "assignedToUser", Array<Invoice>>;
} = {
  myInvoices: {
    createdByUser: [
      {
        id: "INV-1",
        amount: 12345678999, // $ 123,456,789.99
        status: "OPEN",
        createdBy: MOCK_USERS.Guy_McPerson,
        assignedTo: MOCK_USERS.Linda_McContractor,
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "INV-2",
        amount: 5000, // $ 50.00
        status: "OPEN",
        createdBy: MOCK_USERS.Guy_McPerson,
        assignedTo: MOCK_USERS.Linda_McContractor,
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "INV-3",
        amount: 1, // $ 0.01
        status: "CLOSED",
        createdBy: MOCK_USERS.Guy_McPerson,
        assignedTo: MOCK_USERS.Rick_Sanchez,
        workOrderID: "WO-4",
        createdAt: new Date("2020-03-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "INV-10",
        amount: 10000, // $ 100.00
        status: "DISPUTED",
        createdBy: MOCK_USERS.Guy_McPerson,
        assignedTo: MOCK_USERS.Rick_Sanchez,
        workOrderID: "WO-4",
        createdAt: new Date("2020-03-01T03:24:00"),
        updatedAt: new Date()
      }
    ],
    assignedToUser: [
      {
        id: "INV-4",
        amount: 20099, // $ 200.99
        status: "OPEN",
        createdBy: MOCK_USERS.Rick_Sanchez,
        assignedTo: MOCK_USERS.Guy_McPerson,
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "INV-5",
        amount: 12300, // $ 123.00
        status: "DISPUTED",
        createdBy: MOCK_USERS.Linda_McContractor,
        assignedTo: MOCK_USERS.Guy_McPerson,
        workOrderID: "WO-2",
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "INV-6",
        amount: 15000, // $ 150.00
        status: "CLOSED",
        createdBy: MOCK_USERS.Randy_LeDude,
        assignedTo: MOCK_USERS.Guy_McPerson,
        createdAt: new Date("2020-03-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "INV-7",
        amount: 12345678999, // $ 123,456,789.99
        status: "OPEN",
        createdBy: MOCK_USERS.Rick_Sanchez,
        assignedTo: MOCK_USERS.Guy_McPerson,
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "INV-8",
        amount: 100, // $ 1.00
        status: "DISPUTED",
        createdBy: MOCK_USERS.Linda_McContractor,
        assignedTo: MOCK_USERS.Guy_McPerson,
        createdAt: new Date("2022-11-01T03:24:00"),
        updatedAt: new Date()
      },
      {
        id: "INV-9",
        amount: 55555, // $ 555.55
        status: "CLOSED",
        createdBy: MOCK_USERS.Randy_LeDude,
        assignedTo: MOCK_USERS.Guy_McPerson,
        createdAt: new Date("2020-03-01T03:24:00"),
        updatedAt: new Date()
      }
    ]
  }
};

/**
 * Emulates the response structure of the `MyContacts` GQL query.
 */
export const MOCK_CONTACTS: { myContacts: Array<Contact> } = {
  myContacts: [
    {
      id: "CONTACT-1",
      handle: MOCK_USERS.Rick_Sanchez.handle,
      email: MOCK_USERS.Rick_Sanchez.email,
      phone: MOCK_USERS.Rick_Sanchez.phone,
      profile: MOCK_USERS.Rick_Sanchez.profile
    },
    {
      id: "CONTACT-2",
      handle: MOCK_USERS.Linda_McContractor.handle,
      email: MOCK_USERS.Linda_McContractor.email,
      phone: MOCK_USERS.Linda_McContractor.phone,
      profile: MOCK_USERS.Linda_McContractor.profile
    },
    {
      id: "CONTACT-3",
      handle: MOCK_USERS.Randy_LeDude.handle,
      email: MOCK_USERS.Randy_LeDude.email,
      phone: MOCK_USERS.Randy_LeDude.phone,
      profile: MOCK_USERS.Randy_LeDude.profile
    },
    {
      id: "CONTACT-4",
      handle: "@four",
      email: "4@gmail.com",
      phone: "444-444-4444",
      profile: {
        displayName: "Four McFour",
        photoUrl: "https://www.nicepng.com/png/detail/218-2183457_hobbit-gandalf-full-body.png"
      }
    },
    {
      id: "CONTACT-5",
      handle: "@five",
      email: "5@gmail.com",
      phone: "555-555-5555",
      profile: {
        displayName: "Five McFive",
        photoUrl:
          "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eb0d4a56-580b-48a9-9d1a-15c2faab2fff/db54va8-75b6e529-0a44-413d-b133-d729fe58802b.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ViMGQ0YTU2LTU4MGItNDhhOS05ZDFhLTE1YzJmYWFiMmZmZlwvZGI1NHZhOC03NWI2ZTUyOS0wYTQ0LTQxM2QtYjEzMy1kNzI5ZmU1ODgwMmIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TpqdzfEHxmliv_xwJpc0wfRjulawpiXwfBQ-bzEmkd0"
      }
    },
    {
      id: "CONTACT-6",
      handle: "@six",
      email: "6@gmail.com",
      phone: "666-666-6666",
      profile: {
        displayName: "Six McSix",
        photoUrl:
          "https://m.media-amazon.com/images/M/MV5BNDMxY2M5NGItMzJiOS00YTZlLTgwYjYtNTVmZjg2NjgzNzUxXkEyXkFqcGdeQXVyMTI5MzY5OTc5._V1_.jpg"
      }
    },
    {
      id: "CONTACT-7",
      handle: "@seven",
      email: "7@gmail.com",
      phone: "777-777-7777",
      profile: {
        displayName: "Seven McSeven",
        photoUrl: "https://www.trueachievements.com/customimages/l/105804.jpg"
      }
    },
    {
      id: "CONTACT-8",
      handle: "@eight",
      email: "8@gmail.com",
      phone: "888-888-8888",
      profile: {
        displayName: "Eight McEither",
        photoUrl: "https://i.ytimg.com/vi/ZAsswmm8PaA/maxresdefault.jpg"
      }
    },
    {
      id: "CONTACT-9",
      handle: "@nine",
      email: "9@gmail.com",
      phone: "999-999-9999",
      profile: {
        displayName: "Nine McNine",
        photoUrl:
          "https://media.istockphoto.com/id/513644074/photo/common-barn-owl-isolated.jpg?s=612x612&w=0&k=20&c=3A6Y9fBrwQFUz9SbtSnal-i3I9q3QNWElJzCba7GWVM="
      }
    }
  ]
};
