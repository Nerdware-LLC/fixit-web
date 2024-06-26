import { useQuery } from "@apollo/client/react/hooks";
import { QUERIES } from "@/graphql/queries.js";
import { DashboardDataContext } from "./DashboardDataContext.js";
import { workOrdersDataReducer, invoicesDataReducer } from "./itemsDataReducers.js";

export const DashboardDataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: { myWorkOrders } = {} } = useQuery(QUERIES.MY_WORK_ORDERS);
  const { data: { myInvoices } = {} } = useQuery(QUERIES.MY_INVOICES);

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
      createdByUser: itemsData.workOrdersCreatedByUser.MONTH_COUNTS,
      assignedToUser: itemsData.workOrdersAssignedToUser.MONTH_COUNTS,
    },
    InvoicesPerMonthChart: {
      createdByUser: itemsData.invoicesCreatedByUser.MONTH_COUNTS,
      assignedToUser: itemsData.invoicesAssignedToUser.MONTH_COUNTS,
    },
    WorkOrderUpcomingEvents: {
      createdByUser: itemsData.workOrdersCreatedByUser.UPCOMING_EVENTS,
      assignedToUser: itemsData.workOrdersAssignedToUser.UPCOMING_EVENTS,
    },
    OpenInvoiceAmountTotals: {
      RECEIVABLE: itemsData.invoicesCreatedByUser.STATISTICS,
      PAYABLE: itemsData.invoicesAssignedToUser.STATISTICS,
    },
  };

  // Widget configs
  const widgetConfigs = {
    ItemsPerMonthCharts: {
      /* To ensure both the WOs and INVs charts use the same y-axis scale, a
      max value for both charts y-axis is determined here by the count object
      with the single largest y-axis value.  */
      yAxisMaximum: Math.max(
        ...Object.values(widgetData.WorkOrdersPerMonthChart.createdByUser),
        ...Object.values(widgetData.WorkOrdersPerMonthChart.assignedToUser),
        ...Object.values(widgetData.InvoicesPerMonthChart.createdByUser),
        ...Object.values(widgetData.InvoicesPerMonthChart.assignedToUser)
      ),
    },
  };

  return (
    <DashboardDataContext.Provider value={{ widgetData, widgetConfigs }}>
      {children}
    </DashboardDataContext.Provider>
  );
};
