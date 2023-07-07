import * as contactQueries from "./Contact/queries";
import * as invoiceQueries from "./Invoice/queries";
import * as profileQueries from "./Profile/queries";
import * as userQueries from "./User/queries";
import * as workOrderQueries from "./WorkOrder/queries";

export const QUERIES = {
  ...contactQueries,
  ...invoiceQueries,
  ...profileQueries,
  ...userQueries,
  ...workOrderQueries,
};
