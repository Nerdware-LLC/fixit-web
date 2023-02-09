import moment from "moment";
import {
  ItemDataParser,
  ItemStatusCountDataParser,
  ItemsPerMonthCountDataParser
} from "./ItemDataParserClasses";
import { CONSTANTS } from "@types";
import type { WorkOrder, Invoice } from "@types";

// Items status-count data parsers:

export const workOrdersStatusCountDataParser = new ItemStatusCountDataParser<WorkOrder>(
  CONSTANTS.WORK_ORDER.STATUSES
);

export const invoicesStatusCountDataParser = new ItemStatusCountDataParser<Invoice>(
  CONSTANTS.INVOICE.STATUSES
);

// Items per month data parsers:

export const monthLabels = ItemsPerMonthCountDataParser.monthLabels;

export const workOrdersPerMonthCountDataParser = new ItemsPerMonthCountDataParser<WorkOrder>(
  monthLabels
);

export const invoicesPerMonthCountDataParser = new ItemsPerMonthCountDataParser<Invoice>(
  monthLabels
);

/**
 * WorkOrders upcoming dueDate/scheduledDueDate data parser
 */
export const workOrderUpcomingEventsDataParser = new ItemDataParser<WorkOrder>({
  initialDataAccum: { WORK_ORDER_EVENTS: { IN_NEXT_7_DAYS: [] } },
  dataAccumUpdater: (accum, workOrder) => {
    [
      { eventLabel: "Due", eventDate: workOrder?.dueDate },
      { eventLabel: "Scheduled", eventDate: workOrder?.scheduledDateTime }
    ].forEach(({ eventLabel, eventDate }) => {
      if (eventDate instanceof Date) {
        const eventDateMoment = moment(eventDate);
        if (eventDateMoment.isBetween(moment(), moment().add(7, "days"))) {
          accum.WORK_ORDER_EVENTS.IN_NEXT_7_DAYS.push({ ...workOrder, eventLabel, eventDate });
        }
      }
    });
    return accum;
  }
});

/**
 * Open Invoices amount totals data parser
 */
export const openInvoiceAmountTotalsDataParser = new ItemDataParser<Invoice>({
  initialDataAccum: { OPEN_INVOICE_TOTALS: { AMOUNT: 0 } },
  dataAccumUpdater: (accum, invoice) => {
    if (invoice.status === "OPEN") {
      accum.OPEN_INVOICE_TOTALS.AMOUNT += invoice.amount;
    }
    return accum;
  }
});
