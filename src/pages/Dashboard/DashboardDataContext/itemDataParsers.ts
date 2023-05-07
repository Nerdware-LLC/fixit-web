import dayjs from "dayjs";
import { INVOICE_STATUSES } from "@/types/Invoice";
import { WORK_ORDER_STATUSES } from "@/types/WorkOrder";
import {
  ItemDataParser,
  ItemStatusCountDataParser,
  ItemsPerMonthCountDataParser,
} from "./ItemDataParserClasses";
import type { WorkOrder, Invoice } from "@graphql/types";

// Items status-count data parsers:

export const workOrdersStatusCountDataParser = new ItemStatusCountDataParser<WorkOrder>(
  WORK_ORDER_STATUSES
);

export const invoicesStatusCountDataParser = new ItemStatusCountDataParser<Invoice>(
  INVOICE_STATUSES
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
    const now = dayjs();
    const nowPlus7Days = now.add(7, "days");
    [
      { eventLabel: "Due", eventDate: workOrder?.dueDate },
      { eventLabel: "Scheduled", eventDate: workOrder?.scheduledDateTime },
    ].forEach(({ eventLabel, eventDate }) => {
      if (eventDate instanceof Date && dayjs(eventDate).isBetween(now, nowPlus7Days)) {
        accum.WORK_ORDER_EVENTS.IN_NEXT_7_DAYS.push({ ...workOrder, eventLabel, eventDate });
      }
    });
    return accum;
  },
});

export type UpcomingEvent = { eventLabel: string; eventDate: Date };
export type WorkOrderWithUpcomingEvent = WorkOrder & UpcomingEvent;
export type InvoiceWithUpcomingEvent = WorkOrder & UpcomingEvent;

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
  },
});
