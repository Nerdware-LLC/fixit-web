import * as contactQueries from "./Contact/queries.js";
import * as invoiceQueries from "./Invoice/queries.js";
import * as profileQueries from "./Profile/queries.js";
import * as userQueries from "./User/queries.js";
import * as workOrderQueries from "./WorkOrder/queries.js";

export const QUERIES = {
  ...contactQueries,
  ...invoiceQueries,
  ...profileQueries,
  ...userQueries,
  ...workOrderQueries,
} as const;
