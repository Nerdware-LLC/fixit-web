import { INVOICE_STATUSES } from "@/types/Invoice";
import { WORK_ORDER_STATUSES } from "@/types/WorkOrder";
import {
  ItemsPerMonthDataParser,
  ItemsPerStatusDataParser,
  ItemsStatisticsDataParser,
  UpcomingEventsDataParser,
} from "./ItemDataParsers";
import { ItemsDataReducer } from "./ItemsDataReducer";
import type { WorkOrder, Invoice } from "@/graphql/types";

////////////////////////////////////////////////////////////////
// ITEM DATA PARSERS (exported so their `initialDataAccum`s can be used in the init DashboardDataContext obj)

// WorkOrder data parsers
export const workOrdersPerMonthDataParser = new ItemsPerMonthDataParser();
export const workOrdersPerStatusDataParser = new ItemsPerStatusDataParser<WorkOrder>(WORK_ORDER_STATUSES); // prettier-ignore
export const workOrderUpcomingEventsDataParser = new UpcomingEventsDataParser<WorkOrder>(
  (workOrder) => [
    { eventLabel: "Due", eventDate: workOrder?.dueDate },
    { eventLabel: "Scheduled", eventDate: workOrder?.scheduledDateTime },
  ]
);

// Invoice data parsers
export const invoicesPerMonthDataParser = new ItemsPerMonthDataParser();
export const invoicesPerStatusDataParser = new ItemsPerStatusDataParser<Invoice>(INVOICE_STATUSES);
export const openInvoicesAmountTotalDataParser = new ItemsStatisticsDataParser<Invoice>(
  (invoice) => invoice.status === "OPEN" ? invoice.amount : undefined // prettier-ignore
);

////////////////////////////////////////////////////////////////
// ITEMS DATA REDUCERS

const workOrdersDataParsers = [
  workOrdersPerMonthDataParser,
  workOrdersPerStatusDataParser,
  workOrderUpcomingEventsDataParser,
];

export const workOrdersDataReducer = new ItemsDataReducer<WorkOrder, typeof workOrdersDataParsers>(
  workOrdersDataParsers
);

const invoicesDataParsers = [
  invoicesPerMonthDataParser,
  invoicesPerStatusDataParser,
  openInvoicesAmountTotalDataParser,
];

export const invoicesDataReducer = new ItemsDataReducer<Invoice, typeof invoicesDataParsers>(
  invoicesDataParsers
);
