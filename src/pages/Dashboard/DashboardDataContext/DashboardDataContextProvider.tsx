import { useQuery } from "@apollo/client/react/hooks";
import { QUERIES } from "@graphql/queries";
import { DashboardDataContext } from "./DashboardDataContext";
import { ItemsDataReducer } from "./ItemsDataReducer";
import {
  workOrdersStatusCountDataParser,
  workOrdersPerMonthCountDataParser,
  invoicesStatusCountDataParser,
  invoicesPerMonthCountDataParser,
  workOrderUpcomingEventsDataParser,
  openInvoiceAmountTotalsDataParser,
} from "./itemDataParsers";
import type { WorkOrder, Invoice } from "@graphql/types";

const workOrdersDataReducer = new ItemsDataReducer<WorkOrder>([
  workOrdersStatusCountDataParser,
  workOrdersPerMonthCountDataParser,
  workOrderUpcomingEventsDataParser,
]);

const invoicesDataReducer = new ItemsDataReducer<Invoice>([
  invoicesStatusCountDataParser,
  invoicesPerMonthCountDataParser,
  openInvoiceAmountTotalsDataParser,
]);

export const DashboardDataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: { myWorkOrders } = {} } = useQuery(QUERIES.MY_WORK_ORDERS, {
    fetchPolicy: "cache-only", // FIXME
  });

  const { data: { myInvoices } = {} } = useQuery(QUERIES.MY_INVOICES, {
    fetchPolicy: "cache-only", // FIXME
  });

  const itemsData = {
    workOrdersCreatedByUser: workOrdersDataReducer.reduceItems(myWorkOrders?.createdByUser ?? []),
    workOrdersAssignedToUser: workOrdersDataReducer.reduceItems(myWorkOrders?.assignedToUser ?? []),
    invoicesCreatedByUser: invoicesDataReducer.reduceItems(myInvoices?.createdByUser ?? []),
    invoicesAssignedToUser: invoicesDataReducer.reduceItems(myInvoices?.assignedToUser ?? []),
  };

  // Widget data
  const widgetData = {
    WorkOrdersByStatusCounter: {
      createdByUser: itemsData.workOrdersCreatedByUser.STATUS_COUNTS,
      assignedToUser: itemsData.workOrdersAssignedToUser.STATUS_COUNTS,
    },
    InvoicesByStatusCounter: {
      createdByUser: itemsData.invoicesCreatedByUser.STATUS_COUNTS,
      assignedToUser: itemsData.invoicesAssignedToUser.STATUS_COUNTS,
    },
    WorkOrdersPerMonthChart: {
      createdByUser: Object.values(itemsData.workOrdersCreatedByUser.MONTH_COUNTS),
      assignedToUser: Object.values(itemsData.workOrdersAssignedToUser.MONTH_COUNTS),
    },
    InvoicesPerMonthChart: {
      createdByUser: Object.values(itemsData.invoicesCreatedByUser.MONTH_COUNTS),
      assignedToUser: Object.values(itemsData.invoicesAssignedToUser.MONTH_COUNTS),
    },
    WorkOrderUpcomingEvents: {
      createdByUser: itemsData.workOrdersCreatedByUser.WORK_ORDER_EVENTS.IN_NEXT_7_DAYS,
      assignedToUser: itemsData.workOrdersAssignedToUser.WORK_ORDER_EVENTS.IN_NEXT_7_DAYS,
    },
    OpenInvoiceAmountTotals: {
      RECEIVABLE: {
        TOTAL: itemsData.invoicesCreatedByUser.OPEN_INVOICE_TOTALS.AMOUNT,
        AVERAGE: Math.round(
          itemsData.invoicesCreatedByUser.OPEN_INVOICE_TOTALS.AMOUNT /
            itemsData.invoicesCreatedByUser.STATUS_COUNTS.OPEN
        ),
      },
      PAYABLE: {
        TOTAL: itemsData.invoicesAssignedToUser.OPEN_INVOICE_TOTALS.AMOUNT,
        AVERAGE: Math.round(
          itemsData.invoicesAssignedToUser.OPEN_INVOICE_TOTALS.AMOUNT /
            itemsData.invoicesAssignedToUser.STATUS_COUNTS.OPEN
        ),
      },
    },
  };

  // Widget configs
  const widgetConfigs = {
    ItemsPerMonthCharts: {
      /* To ensure both the WOs and INVs charts use the same y-axis scale, a
      max value for both charts y-axis is determined here by the count object
      with the single largest y-axis value.  */
      yAxisMaximum: Math.max(
        ...widgetData.WorkOrdersPerMonthChart.createdByUser,
        ...widgetData.WorkOrdersPerMonthChart.assignedToUser,
        ...widgetData.InvoicesPerMonthChart.createdByUser,
        ...widgetData.InvoicesPerMonthChart.assignedToUser
      ),
    },
  };

  return (
    <DashboardDataContext.Provider value={{ widgetData, widgetConfigs } as any}>
      {children}
    </DashboardDataContext.Provider>
  );
};
