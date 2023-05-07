import { createContext, useContext } from "react";
import { workOrdersStatusCountDataParser, invoicesStatusCountDataParser } from "./itemDataParsers";
import type { WorkOrder, Invoice } from "@graphql/types";
import type { ItemStatusCounter } from "./ItemDataParserClasses";

export const DashboardDataContext = createContext<{
  widgetData: {
    // status counters:
    WorkOrdersByStatusCounter: ItemsSplitByOwnership<ItemStatusCounter<WorkOrder>>;
    InvoicesByStatusCounter: ItemsSplitByOwnership<ItemStatusCounter<Invoice>>;
    // items per month:
    WorkOrdersPerMonthChart: ItemsSplitByOwnership<number[]>;
    InvoicesPerMonthChart: ItemsSplitByOwnership<number[]>;
    // work order dueDates/scheduledDateTimes within the next 7 days:
    WorkOrderUpcomingEvents: ItemsSplitByOwnership<
      Array<WorkOrder & { eventLabel: string; eventDate: Date }>
    >;
    // open invoice amount totals:
    OpenInvoiceAmountTotals: {
      RECEIVABLE: { TOTAL: 0; AVERAGE: 0 };
      PAYABLE: { TOTAL: 0; AVERAGE: 0 };
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
      createdByUser: workOrdersStatusCountDataParser.initialDataAccum.STATUS_COUNTS as any,
      assignedToUser: workOrdersStatusCountDataParser.initialDataAccum.STATUS_COUNTS as any,
    },
    InvoicesByStatusCounter: {
      createdByUser: invoicesStatusCountDataParser.initialDataAccum.STATUS_COUNTS as any,
      assignedToUser: invoicesStatusCountDataParser.initialDataAccum.STATUS_COUNTS as any,
    },
    WorkOrdersPerMonthChart: {
      createdByUser: [],
      assignedToUser: [],
    },
    InvoicesPerMonthChart: {
      createdByUser: [],
      assignedToUser: [],
    },
    WorkOrderUpcomingEvents: {
      createdByUser: [],
      assignedToUser: [],
    },
    OpenInvoiceAmountTotals: {
      RECEIVABLE: { TOTAL: 0, AVERAGE: 0 },
      PAYABLE: { TOTAL: 0, AVERAGE: 0 },
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
