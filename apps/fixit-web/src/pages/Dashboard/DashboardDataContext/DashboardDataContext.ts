import { createContext, useContext } from "react";
import {
  workOrdersPerStatusDataParser,
  workOrdersPerMonthDataParser,
  workOrderUpcomingEventsDataParser,
  invoicesPerStatusDataParser,
  invoicesPerMonthDataParser,
  openInvoicesAmountTotalDataParser,
} from "./itemsDataReducers.js";
import type { WorkOrder, Invoice } from "@/types/graphql.js";
import type {
  ItemsPerStatusDataParserAccum,
  ItemsPerMonthDataParserAccum,
  ItemsStatisticsDataParserAccum,
  UpcomingEventsDataParserAccum,
} from "./ItemDataParsers";

export const DashboardDataContext = createContext<{
  widgetData: {
    // status counters:
    WorkOrdersByStatusCounter: ItemsSplitByOwnership<ItemsPerStatusDataParserAccum<WorkOrder>["STATUS_COUNTS"]>; // prettier-ignore
    InvoicesByStatusCounter: ItemsSplitByOwnership<ItemsPerStatusDataParserAccum<Invoice>["STATUS_COUNTS"]>; // prettier-ignore
    // items per month:
    WorkOrdersPerMonthChart: ItemsSplitByOwnership<ItemsPerMonthDataParserAccum["MONTH_COUNTS"]>;
    InvoicesPerMonthChart: ItemsSplitByOwnership<ItemsPerMonthDataParserAccum["MONTH_COUNTS"]>;
    // work order dueDates/scheduledDateTimes within the next 7 days:
    WorkOrderUpcomingEvents: ItemsSplitByOwnership<UpcomingEventsDataParserAccum<WorkOrder>["UPCOMING_EVENTS"]>; // prettier-ignore
    // open invoice amount totals:
    OpenInvoiceAmountTotals: {
      RECEIVABLE: ItemsStatisticsDataParserAccum["STATISTICS"];
      PAYABLE: ItemsStatisticsDataParserAccum["STATISTICS"];
    };
  };
  widgetConfigs: {
    ItemsPerMonthCharts: {
      yAxisMaximum: number;
    };
  };
}>({
  widgetData: {
    WorkOrdersByStatusCounter: {
      createdByUser: workOrdersPerStatusDataParser.initialDataAccum.STATUS_COUNTS,
      assignedToUser: workOrdersPerStatusDataParser.initialDataAccum.STATUS_COUNTS,
    },
    InvoicesByStatusCounter: {
      createdByUser: invoicesPerStatusDataParser.initialDataAccum.STATUS_COUNTS,
      assignedToUser: invoicesPerStatusDataParser.initialDataAccum.STATUS_COUNTS,
    },
    WorkOrdersPerMonthChart: {
      createdByUser: workOrdersPerMonthDataParser.initialDataAccum.MONTH_COUNTS,
      assignedToUser: workOrdersPerMonthDataParser.initialDataAccum.MONTH_COUNTS,
    },
    InvoicesPerMonthChart: {
      createdByUser: invoicesPerMonthDataParser.initialDataAccum.MONTH_COUNTS,
      assignedToUser: invoicesPerMonthDataParser.initialDataAccum.MONTH_COUNTS,
    },
    WorkOrderUpcomingEvents: {
      createdByUser: workOrderUpcomingEventsDataParser.initialDataAccum.UPCOMING_EVENTS,
      assignedToUser: workOrderUpcomingEventsDataParser.initialDataAccum.UPCOMING_EVENTS,
    },
    OpenInvoiceAmountTotals: {
      RECEIVABLE: openInvoicesAmountTotalDataParser.initialDataAccum.STATISTICS,
      PAYABLE: openInvoicesAmountTotalDataParser.initialDataAccum.STATISTICS,
    },
  },
  widgetConfigs: {
    ItemsPerMonthCharts: {
      yAxisMaximum: 10, // <-- arbitrary default
    },
  },
});

export const useDashboardDataContext = () => useContext(DashboardDataContext);

type ItemsSplitByOwnership<TDataAccum> = {
  createdByUser: TDataAccum;
  assignedToUser: TDataAccum;
};
