import * as contactQueries from "./contact/queries";
import * as invoiceQueries from "./invoice/queries";
import * as phoneContactQueries from "./phoneContact/queries";
import * as profileQueries from "./profile/queries";
import * as userQueries from "./user/queries";
import * as workOrderQueries from "./workOrder/queries";

export const QUERIES = {
  ...contactQueries,
  ...invoiceQueries,
  ...phoneContactQueries,
  ...profileQueries,
  ...userQueries,
  ...workOrderQueries
};
