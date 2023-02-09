import { faker } from "@faker-js/faker";
import { makeFake, tryToGetItemAgeInDays } from "./_common";
import { MOCK_USERS } from "./mockUsers";
import { getRandomContact } from "./mockContacts";
import { CONSTANTS } from "@types";
import { randomIntBetween } from "@utils";
import type { WorkOrder } from "@types";

// Relational item properties are required
type CreateMockWorkOrderRequiredArgs = "createdBy" | "assignedTo";

const createMockWorkOrder = (
  {
    createdBy,
    assignedTo,
    ...overrides
  }: Pick<WorkOrder, CreateMockWorkOrderRequiredArgs> & //       <-- these WO properties' types are not modified
    Omit<Partial<WorkOrder>, CreateMockWorkOrderRequiredArgs> // <-- remaining WO properties are made optional
): WorkOrder => {
  // Ensure WO is not older than the createdBy User account; place WO max age at 365 days (any older and it won't show on DashboardPage)
  const woCreatedAt =
    overrides?.createdAt ??
    faker.date.recent(
      Math.min(
        365,
        tryToGetItemAgeInDays(createdBy) ?? 365 // <-- how many days old User account is
      )
    );

  const workOrderID =
    overrides?.id ?? `WO#${createdBy.id}#${Math.floor(woCreatedAt.getTime() / 1000)}`;

  return {
    id: workOrderID,
    createdBy,
    assignedTo,

    location: {
      country: faker.helpers.maybe(() => "USA"),
      region: faker.address.state(),
      city: faker.address.city(),
      streetLine1: faker.address.streetAddress(),
      streetLine2: faker.helpers.maybe(() => faker.address.secondaryAddress()),
      // merge possible location override values
      ...(overrides?.location && overrides.location)
    },

    // If `assignedTo` was not provided, ensure `status` is "UNASSIGNED", else filter it out.
    status:
      overrides?.status ?? assignedTo
        ? faker.helpers.arrayElement(
            CONSTANTS.WORK_ORDER.STATUSES.filter((status) => status !== "UNASSIGNED")
          )
        : "UNASSIGNED",

    priority: overrides?.priority ?? faker.helpers.arrayElement(CONSTANTS.WORK_ORDER.PRIORITIES),

    category:
      overrides?.category ??
      faker.helpers.maybe(() => faker.helpers.arrayElement(CONSTANTS.WORK_ORDER.CATEGORIES)),

    description: overrides?.description ?? makeFake.textUpTo255chars(),

    checklist:
      overrides?.checklist ??
      faker.helpers.maybe(() => {
        /* Checklist array length is determined by Math.random, which returns a number
        between 0-1 which is then multiplied by 50, resulting in 0-50 Checklist Items.*/
        return [...Array(Math.floor(Math.random() * 50))].map(() => {
          const checklistItemCreatedAt = faker.date.between(woCreatedAt, new Date());
          return {
            // prettier-ignore
            id: `${workOrderID}#CHECKLIST_ITEM#${Math.floor(checklistItemCreatedAt.getTime() / 1000)}`,
            description: makeFake.textUpTo255chars(),
            isCompleted: faker.datatype.boolean()
          };
        });
      }),

    entryContact: overrides?.entryContact ?? faker.helpers.maybe(() => faker.name.fullName()),

    entryContactPhone: overrides?.entryContactPhone ?? faker.helpers.maybe(() => makeFake.phone()),

    // date between 60 days ago ("overdue"), and 60 days ahead
    dueDate:
      overrides?.dueDate ??
      faker.helpers.maybe(() => faker.date.between(faker.date.recent(60), faker.date.soon(60))),

    // date between 60 days ago ("overdue"), and 60 days ahead
    scheduledDateTime:
      overrides?.scheduledDateTime ??
      faker.helpers.maybe(() => faker.date.between(faker.date.recent(60), faker.date.soon(60))),

    contractorNotes:
      overrides?.contractorNotes ?? faker.helpers.maybe(() => makeFake.textUpTo255chars()),

    createdAt: woCreatedAt,

    updatedAt: overrides?.updatedAt ?? faker.date.between(woCreatedAt, new Date())
  };
};

/**
 * **Mock Work Orders**
 *
 * - Emulates the response structure of the `MyWorkOrders` GQL query.
 */
export const MOCK_WORK_ORDERS = {
  myWorkOrders: {
    // Between 20-50 work orders created by user "Guy McPerson":
    createdByUser: [...Array(randomIntBetween(20, 50))].map(() =>
      createMockWorkOrder({
        createdBy: MOCK_USERS.Guy_McPerson,
        // Assign 90% of WOs to random mock contact
        assignedTo: faker.helpers.maybe(() => getRandomContact(), { probability: 0.9 })
      })
    ),
    // Between 20-50 work orders assigned to user "Guy McPerson":
    assignedToUser: [...Array(randomIntBetween(20, 50))].map(() =>
      createMockWorkOrder({
        // Created by random mock contact
        createdBy: getRandomContact(),
        assignedTo: MOCK_USERS.Guy_McPerson
      })
    )
  }
} as {
  myWorkOrders: Record<"createdByUser" | "assignedToUser", Array<WorkOrder>>;
};
