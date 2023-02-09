import { faker } from "@faker-js/faker";
import { tryToGetItemAgeInDays } from "./_common";
import { MOCK_USERS } from "./mockUsers";
import { getRandomContact } from "./mockContacts";
import { MOCK_WORK_ORDERS } from "./mockWorkOrders";
import { CONSTANTS } from "@types";
import { randomIntBetween } from "@utils";
import type { Invoice, FixitUser } from "@types";

// Relational item properties are required
type CreateMockInvoiceRequiredArgs = "createdBy" | "assignedTo" | "workOrder";

const createMockInvoice = (
  {
    createdBy,
    assignedTo,
    workOrder,
    ...overrides
  }: Pick<Invoice, CreateMockInvoiceRequiredArgs> & //       <-- these INV properties' types are not modified
    Omit<Partial<Invoice>, CreateMockInvoiceRequiredArgs> // <-- remaining INV  properties are made optional
): Invoice => {
  // Ensure INV is not older than the createdBy User account; place INV max age at 365 days (any older and it won't show on DashboardPage)
  const invCreatedAt =
    overrides?.createdAt ??
    faker.date.recent(
      Math.min(
        365,
        tryToGetItemAgeInDays(createdBy) ?? 365 // <-- how many days old User account is
      )
    );

  /* status will be OPEN, CLOSED, or DISPUTED. Most IRL invoices will be either OPEN
  or CLOSED, however, so to ensure DISPUTED is not over-represented in the mock data,
  we have faker pick a "random" status from an array which only includes DISPUTED 20%
  of the time.  */
  const invoiceStatus =
    overrides?.status ??
    (faker.helpers.arrayElement(
      [
        // Include all status values except for DISPUTED:
        ...CONSTANTS.INVOICE.STATUSES.filter((status) => status !== "DISPUTED"),
        // faker.helpers.maybe will return either DISPUTED or undefined
        faker.helpers.maybe(() => "DISPUTED", { probability: 0.2 })
      ].filter((el) => !!el) // <-- filters out undefined, if present
    ) as Invoice["status"]); // <-- TS not recognizing undefined filtered out of arrayElement

  return {
    id: overrides?.id ?? `INV#${createdBy.id}#${Math.floor(invCreatedAt.getTime() / 1000)}`,
    createdBy,
    assignedTo,
    status: invoiceStatus,

    /* amount will be an integer between 1-10000000 ($0.01 - $100,000.00). Most IRL
    invoices are likely to be around $100-1000, so to ensure we don't wind up with
    too many invoice amounts near the upper/lower bounds, we have faker pick a "random"
    integer from an array which will always contain a number from the target range
    between 10000-100000 ($100-1000), and 5% of the time will also contain a number
    from above and/or below the target range. This way, unusually large and small
    amounts can be included in the mock data without being over-represented. Note
    that 5% was chosen arbitrarily and can be tweaked as needed.  */
    amount:
      overrides?.amount ??
      (faker.helpers.arrayElement(
        [
          // lower bound range, 1-9999 ($0.01 - $99.99)
          faker.helpers.maybe(() => randomIntBetween(1, 9999), { probability: 0.05 }), // 5%
          // target range, 10000-100000 ($100.00 - $1,000.00)
          randomIntBetween(10000, 100000),
          // upper bound range, 100001-10000000 ($1,000.01 - $100,000.00)
          faker.helpers.maybe(() => randomIntBetween(100001, 10000000), { probability: 0.05 }) // 5%
        ].filter((el) => !!el) // <-- removes any undefined values
      ) as Invoice["amount"]), // <-- TS not recognizing undefined filtered out of arrayElement

    /* stripePaymentIntentID is dependent upon the Invoice's status:
      - If status is "OPEN", stripePaymentIntentID will be undefined.
      - If status is "CLOSED", stripePaymentIntent will be defined.
      - If status is "DISPUTED", stripePaymentIntentID can be either defined or undefined,
        depending on the reason for the Invoice becoming DISPUTED.
    */
    ...(invoiceStatus !== "OPEN" && {
      stripePaymentIntentID: faker.helpers.maybe(() => `pi_${faker.random.alphaNumeric(15)}`, {
        probability:
          invoiceStatus === "CLOSED"
            ? 1 //   CLOSED:   always defined
            : 0.5 // DISPUTED: 50/50 defined/undefined
      })
    }),

    workOrder,
    createdAt: invCreatedAt,
    updatedAt: overrides?.updatedAt ?? faker.date.between(invCreatedAt, new Date())
  };
};

/**
 * This fn attempts to find a mock `WorkOrder` that's attachable to a given
 * mock `Invoice`. A WO is "attachable" if the following are both true:
 *
 * 1. `Invoice.createdBy` is the same user as `WorkOrder.assignedTo`
 * 2. `Invoice.assignedTo` is the same user as `WorkOrder.createdBy`
 *
 * Since mock item relationships are randomized, it can't be guaranteed that the
 * provided Invoice `createdBy`/`assignedTo` users will have a corresponding
 * WorkOrder with the correct users. With 20-50 mock WO items and only 5 users
 * used to define the `createdBy`/`assignedTo` relationships - one of which is
 * always "Guy McPerson" - a WO with the appropriate values should be available
 * for the vast majority of mock invoices. In the event that no such corresponding
 * WO is found to exist, however, `Invoice.workOrder` will be undefined.
 */
const findWorkOrderWithInverseUserRoles = ({
  invoiceCreatedBy,
  invoiceAssignedTo
}: {
  invoiceCreatedBy: FixitUser;
  invoiceAssignedTo: FixitUser;
}) => {
  // If Invoice.createdBy is "Guy McPerson", search `assignedToUser`, else search `createdByUser`
  const possibleCorrespondingWOs =
    invoiceCreatedBy.profile.displayName === "Guy McPerson"
      ? MOCK_WORK_ORDERS.myWorkOrders.assignedToUser
      : MOCK_WORK_ORDERS.myWorkOrders.createdByUser;

  // Now find all WOs with the correct createdBy/assignedTo users (inverse of the Invoice)
  const correspondingWOs = possibleCorrespondingWOs.filter(
    (wo) => invoiceCreatedBy.id === wo.assignedTo?.id && invoiceAssignedTo.id === wo.createdBy.id
  );

  // If 1 or more WOs have the correct createdBy/assignedTo users, pick one at random
  if (correspondingWOs.length > 0) {
    return faker.helpers.arrayElement(correspondingWOs);
  }
};

/**
 * **Mock Invoices**
 *
 * - Emulates the response structure of the `MyInvoices` GQL query.
 * - `Invoice.workOrder` is defined roughly 50% of the time.
 */
export const MOCK_INVOICES = {
  myInvoices: {
    // Between 20-50 invoices created by user "Guy McPerson":
    createdByUser: [...Array(randomIntBetween(20, 50))].map(() => {
      // Assign to random mock contact
      const invoiceAssignedTo = getRandomContact();

      return createMockInvoice({
        createdBy: MOCK_USERS.Guy_McPerson,
        assignedTo: invoiceAssignedTo,
        workOrder: faker.helpers.maybe(() =>
          // Attempt to find a suitable corresponding WorkOrder:
          findWorkOrderWithInverseUserRoles({
            invoiceCreatedBy: MOCK_USERS.Guy_McPerson,
            invoiceAssignedTo
          })
        )
      });
    }),
    // Between 20-50 invoices assigned to user "Guy McPerson":
    assignedToUser: [...Array(randomIntBetween(20, 50))].map(() => {
      // Created by random mock contact
      const invoiceCreatedBy = getRandomContact();

      return createMockInvoice({
        createdBy: invoiceCreatedBy,
        assignedTo: MOCK_USERS.Guy_McPerson,
        workOrder: faker.helpers.maybe(() =>
          // Attempt to find a suitable corresponding WorkOrder:
          findWorkOrderWithInverseUserRoles({
            invoiceCreatedBy,
            invoiceAssignedTo: MOCK_USERS.Guy_McPerson
          })
        )
      });
    })
  }
} as {
  myInvoices: Record<"createdByUser" | "assignedToUser", Array<Invoice>>;
};
