import { faker } from "@faker-js/faker";
import { makeFake } from "@/tests/utils/makeFake";
import {
  WORK_ORDER_STATUSES,
  WORK_ORDER_CATEGORIES,
  WORK_ORDER_PRIORITIES,
} from "@/types/WorkOrder.js";
import { randomIntBetween, getItemAge } from "@/utils/numeric";
import { getRandomUser } from "./mockUsers.js";
import { STATIC_MOCK_USERS } from "./staticMockUsers.js";
import type { MyWorkOrdersQueryResponse, WorkOrder } from "@/types/graphql.js";

const createMockWorkOrder = ({
  createdBy,
  assignedTo = null,
}: Pick<WorkOrder, "createdBy" | "assignedTo">): WorkOrder => {
  // Ensure WO is not older than the createdBy User account; place WO max age at 365 days (any older and it won't show on DashboardPage)
  const woCreatedAt = faker.date.recent({
    days: Math.min(
      365,
      getItemAge(createdBy) ?? 365 // <-- how many days old User account is
    ),
  });

  // If 'createdBy' is a Contact, rm "CONTACT#" prefix from ID, else use ID as-is
  const workOrderID = `WO#${createdBy.id.replace(/CONTACT#/, "")}#${Math.floor(
    woCreatedAt.getTime() / 1000
  )}`;

  return {
    __typename: "WorkOrder",

    id: workOrderID,
    createdBy,
    assignedTo,

    location: {
      country: "USA",
      region: faker.location.state(),
      city: faker.location.city(),
      streetLine1: faker.location.streetAddress(),
      streetLine2: faker.helpers.maybe(() => faker.location.secondaryAddress()) ?? null,
    },

    // If `assignedTo` was not provided, ensure `status` is "UNASSIGNED", else filter it out.
    status: assignedTo
      ? faker.helpers.arrayElement(WORK_ORDER_STATUSES.filter((status) => status !== "UNASSIGNED"))
      : "UNASSIGNED",

    priority: faker.helpers.arrayElement(WORK_ORDER_PRIORITIES),

    category: faker.helpers.maybe(() => faker.helpers.arrayElement(WORK_ORDER_CATEGORIES)) ?? null,

    description: makeFake.workOrderDescription(),

    checklist:
      faker.helpers.maybe(() =>
        /* Checklist array length is determined by Math.random, which returns a number
        between 0-1 which is then multiplied by 50, resulting in 0-50 Checklist Items.*/
        Array.from({ length: Math.floor(Math.random() * 50) }).map(() => ({
          // prettier-ignore
          id: `${workOrderID}#CHECKLIST_ITEM#${Math.floor(faker.date.between({ from: woCreatedAt, to: new Date() }).getTime() / 1000)}`,
          description: makeFake.textUpToNumChars(250),
          isCompleted: faker.datatype.boolean(),
        }))
      ) ?? null,

    entryContact: faker.helpers.maybe(() => faker.person.fullName()) ?? null,

    entryContactPhone: faker.helpers.maybe(() => makeFake.phone()) ?? null,

    // date between 60 days ago ("overdue"), and 60 days ahead
    dueDate:
      faker.helpers.maybe(() =>
        faker.date.between({
          from: faker.date.recent({ days: 60 }),
          to: faker.date.soon({ days: 60 }),
        })
      ) ?? null,

    // date between 60 days ago ("overdue"), and 60 days ahead
    scheduledDateTime:
      faker.helpers.maybe(() =>
        faker.date.between({
          from: faker.date.recent({ days: 60 }),
          to: faker.date.soon({ days: 60 }),
        })
      ) ?? null,

    contractorNotes: faker.helpers.maybe(() => makeFake.textUpTo255chars()) ?? null,

    createdAt: woCreatedAt,

    updatedAt: faker.date.between({ from: woCreatedAt, to: new Date() }),
  };
};

/**
 * **Mock Work Orders**
 *
 * - Emulates the response structure of the `MyWorkOrders` GQL query.
 */
export const MOCK_WORK_ORDERS = {
  myWorkOrders: {
    // Between 50-100 work orders created by user "Guy McPerson":
    createdByUser: Array.from({ length: randomIntBetween(50, 100) }, () =>
      createMockWorkOrder({
        createdBy: STATIC_MOCK_USERS.Guy_McPerson,
        // Assign 90% of WOs to random mock contact
        assignedTo: faker.helpers.maybe(() => getRandomContact(), { probability: 0.9 }),
      })
    ),
    // Between 50-100 work orders assigned to user "Guy McPerson":
    assignedToUser: Array.from({ length: randomIntBetween(50, 100) }, () =>
      createMockWorkOrder({
        // Created by random mock contact
        createdBy: getRandomContact(),
        assignedTo: STATIC_MOCK_USERS.Guy_McPerson,
      })
    ),
  },
} as const satisfies {
  myWorkOrders: MyWorkOrdersQueryReturnType;
};
